import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new NextResponse('CLERK_WEBHOOK_SECRET is not configured', {
      status: 500,
    });
  }

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt.type;
  
  try {
    await connectDB();

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
      
      const primaryEmail = email_addresses?.[0]?.email_address || '';
      
      await User.create({
        clerkId: id,
        email: primaryEmail,
        firstName: first_name || '',
        lastName: last_name || '',
        username: username || undefined,
        profileImage: image_url || undefined,
      });
      
      console.log('User created in database:', id);
    }

    if (eventType === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;
      
      const primaryEmail = email_addresses?.[0]?.email_address || '';
      
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: primaryEmail,
          firstName: first_name || '',
          lastName: last_name || '',
          username: username || undefined,
          profileImage: image_url || undefined,
        },
        { upsert: true, new: true }
      );
      
      console.log('User updated in database:', id);
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      
      await User.findOneAndDelete({ clerkId: id });
      
      console.log('User deleted from database:', id);
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new NextResponse('Error processing webhook', {
      status: 500,
    });
  }

  return new NextResponse('', { status: 200 });
}
