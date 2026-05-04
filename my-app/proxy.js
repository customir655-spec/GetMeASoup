import { NextResponse } from 'next/server'
import { auth } from './auth'


// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    
const session =  await auth();

console.log(request.url);

if(session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
} 
//   return NextResponse.redirect(new URL('/login', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/login',
}