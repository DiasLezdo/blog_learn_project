import { NextRequest, NextResponse } from "next/server";

// Middleware function
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  try {
    // **1️⃣ Instrumentation Error Handling**
    // if (pathname.startsWith("/")) {
    //   try {
    //     // Simulate instrumentation logic (error handling)
    //     throw new Error("Instrumentation error occurred");
    //   } catch (error) {
    //     console.error("Middleware caught instrumentation error:", error);
    //     return NextResponse.redirect(new URL("/error/server", request.url));
    //   }
    // }

    // **2️⃣ Session Handling (Protect User Routes)**
    if (
      // pathname.startsWith("/home") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/post")
    ) {
      const session = await request.cookies.get("session"); // Check if session exists

      console.log("session", session);
      if (!session?.value) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    }

    if (
      // pathname.startsWith("/home") ||
      pathname.startsWith("/api/profile") ||
      pathname.startsWith("/api/post")
    ) {
      const session = await request.cookies.get("session"); // Check if session exists
      // const session = request.cookies.has("session"); // return boolean

      console.log("api session", session);

      if (!session?.value) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }

      const requestHeaders = new Headers(request.headers);
      // requestHeaders.set("x-auth-user-middleware", session.value);

      // return NextResponse.next();

      // You can also set request headers in NextResponse.next
      const response = NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });

      // Set a new response header `x-hello-from-middleware2`
      response.headers.set("x-auth-user-middleware", session?.value);
      return response;
    }

    // **3️⃣ Admin Access Control**
    if (pathname.startsWith("/admin")) {
      const adminSession = request.cookies.get("admin-token"); // Example check

      if (!adminSession || adminSession.value !== "valid-admin-token") {
        return NextResponse.redirect(new URL("/not-authorized", request.url));
      }
    }

    // Allow request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

// **Configure Matching Routes**
export const config = {
  matcher: [
    "/post", // Match all under /post (session check)
    // "/post/:path*", // Match all under /post (session check)
    "/profile", // Match all under /profile (session check)
    "/:path*", // Match all under /instrumentation
    "/admin/:path*", // Match all under /admin (admin check)
  ],
};
