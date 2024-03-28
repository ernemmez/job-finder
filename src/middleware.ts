import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/?loginRedirect=true", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs", "/is-ilanlari"],
};
