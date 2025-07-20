
'use server'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
 
export async function Delete() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_token'); // Specify path if needed
    cookieStore.delete('user_id'); // Specify path if needed
    revalidatePath('/'); // Update cached posts
    redirect('/user/login'); // Navigate to the new post page
  }