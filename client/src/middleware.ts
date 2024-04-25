import { NextRequest, NextResponse } from "next/server";

export default function user_access(request: NextRequest){
    const auth_token = request.cookies.get("authToken");
    if((request.nextUrl.pathname !== "/" && request.nextUrl.pathname !== "/signup") && !auth_token){
        return NextResponse.redirect(new URL("/", request.url));
    }
}