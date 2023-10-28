import { dbConnect, BuzzUser } from '@/lib/db';
import { cookies } from 'next/headers';

dbConnect();

export async function POST(req: Request) {
  const POST_body = await req.json();
  const user_id_cookie = cookies().get('buzz-user');
  const _id = user_id_cookie?.value;

  try {
    const userFound = BuzzUser.findOne({ _id: _id }).then((user: any) => {
      return user;
    });
    return Response.json({ success: 'user found' });
  } catch (error) {
    console.error('Error finding user:', error);
    return Response.json({ error: 'error finding user' });
  }
}