import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return new Response(`Webhook error: ${err}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: (session.amount_total as number) / 100,
          status: session.payment_status,
          userId: session.metadata?.userId,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);

      break;
    }
    default: {
      console.log(`Unhandled event type ${event.type}`);
    }
  }
  return new Response(null, { status: 200 });
}
