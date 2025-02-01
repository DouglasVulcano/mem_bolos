import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("authToken");

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

// Aplica o middleware apenas para rotas privadas
export const config = {
  matcher: ["/admin/:path*"],
};
