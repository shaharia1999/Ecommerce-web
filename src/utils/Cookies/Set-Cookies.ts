'use server'
import { cookies } from 'next/headers'
export async function SetCookies(token: string) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day
  // const oneDayInMilliseconds = 2 * 60 * 1000;; // test
  const expires = new Date(Date.now() + oneDayInMilliseconds); 
   const cookieStore =  await cookies();
    cookieStore.set({
    name: 'admin_token',
    value: token,
    httpOnly: true,
    path: '/',
    expires, 
  });
}
export async function SetCookiesId(token: string) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day
  // const oneDayInMilliseconds = 2 * 60 * 1000;; // test
  const expires = new Date(Date.now() + oneDayInMilliseconds); 
   const cookieStore =  await cookies();
    cookieStore.set({
    name: 'user_id',
    value: token,
    httpOnly: true,
    path: '/',
    expires, 
  });
}
 export async function GetCookies() {
    const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')
  if(token?.value){
    return token.value;
  }
  else{
    return null;
  }

}
 export async function GetCookiesId() {
    const cookieStore = await cookies()
  const token = cookieStore.get('user_id')
  if(token?.value){
    return token.value;
  }
  else{
    return null;
  }

}