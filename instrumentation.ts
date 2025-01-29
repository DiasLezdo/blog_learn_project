import dbConnect from "./libs/dbConn";

export async function register() {
  try {
    await dbConnect();
  } catch (error) {
    return console.log("error", error);
  }
}

// Instrumentation

// Instrumentation is the process of using code to integrate monitoring and logging tools into your application.
// This allows you to track the performance and behavior of your application, and to debug issues in production.

// Convention

// To set up instrumentation, create instrumentation.ts|js file in the root directory of your project (or inside the src folder if using one).
// Then, export a register function in the file. This function will be called once when a new Next.js server instance is initiated.
