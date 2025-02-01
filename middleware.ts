import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const url = req.nextUrl.clone();

  // Permitir carregamento de arquivos estáticos (CSS, JS, imagens)
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/static"))
    return NextResponse.next();

  if (token && url.pathname === "/login")
    return NextResponse.redirect(new URL("/admin", req.url));

  if (!token && url.pathname !== "/login")
    return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
