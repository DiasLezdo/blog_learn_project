import { NextRequest, NextResponse } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
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
      // console.log("req", request.cookies.getAll());
      const session = request.cookies.get("session"); // Check if session exists

      if (!session) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
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
    "/:path*", // Match all under /instrumentation
    "/post/:path*", // Match all under /dashboard (session check)
    "/profile/:path*", // Match all under /profile (session check)
    "/admin/:path*", // Match all under /admin (admin check)
  ],
};
