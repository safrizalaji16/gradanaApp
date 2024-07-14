import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "./constants/api/config";

export default async function middleware(req: NextRequest) {
  const { url } = req;

  if (url.includes("/dashboard")) {
    const userCookie = req.cookies.get(cookieName)?.value;

    if (!userCookie) {
      const redirectUrl = new URL("/auth/login", req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl.toString(), { status: 307 });
    } else {
      const now = new Date();
      const expiryTimestamp = now.getTime() + 1800 * 1000;
      const futureDate = new Date(expiryTimestamp);

      const res = NextResponse.next();

      res.cookies.set(cookieName, userCookie, {
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
        expires: futureDate,
      });

      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
