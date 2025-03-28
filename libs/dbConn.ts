import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = await mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("Db connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.log("errprprrp", e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

// ----- Attention here ------------------

// https://dev.to/thatanjan/2-ways-to-set-up-nextjs-with-mongodb-and-mongoose-4afo

// Why Call dbConnect in Every Request?

// Stateless Nature of Serverless Functions:

// Next.js API routes often run in serverless environments (like Vercel), where each function invocation is stateless.
// Functions can spin up and shut down rapidly, so relying on persistent connections without proper management can lead to
//  connection leaks or exhausting database resources.

// Ensuring Connection Availability:

// By calling dbConnect in each API route, you ensure that the database connection is established before performing
//  any database operations.
// This guarantees that your routes are resilient and can handle requests reliably, regardless of the deployment environment.

// -------------------------------------------------------

// How Does Connection Caching Work?

// In the lib/mongoose.js file you created, a connection caching mechanism is implemented using the global object.

//  Here's how it works:

// Explanation:

// Global Caching:

// The global object in Node.js persists across module reloads in development environments (like with Next.js's hot reloading).
// By attaching the mongoose connection to global, you ensure that the connection is reused across multiple invocations during
//  development, preventing multiple connections from being established.

// Connection Reuse:

// First Request: When dbConnect is called for the first time, it establishes a connection and stores it in cached.promise.
// Subsequent Requests: Future calls check if cached.conn exists. If it does, the existing connection is returned immediately
//  without establishing a new one.
// This mechanism ensures that only one connection is active at any given time, optimizing resource usage.

// Buffering Commands:

// The bufferCommands: false option ensures that Mongoose doesn't buffer database operations until the connection is established.
//  This is useful for handling connection errors gracefully.
