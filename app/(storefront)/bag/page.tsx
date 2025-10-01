import { SubmitButton } from '@/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import { deleteItem } from '@/lib/actions';
import { formatPrice } from '@/lib/helpers/formatPrice';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Ban } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function BagPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect('/');

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const totalPrice =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;

  return (
    <div className="max-w-3xl mx-auto mt-12 min-h-[60vh] px-4">
      {!cart || cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-2xl font-semibold mb-2">Your bag is empty</h1>
          <p className="text-muted-foreground">
            You currently dont have any productsin your shopping bag. Start
            shopping to fill it up!
          </p>
          <Ban className="mt-6 h-12 w-12 text-muted-foreground" />
          <Button asChild  className="mt-12">
            <Link href="/" className="flex items-center">
              Shop Now!!
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-8">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-6 last:border-none"
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={item.imageString}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <p className="font-medium text-lg">{item.name}</p>
                  <div className="flex items-center gap-2 text-md font-semibold text-muted-foreground mt-1">
                    <span>{item.quantity} ×</span>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end mt-3 sm:mt-0">
                  <form action={deleteItem}>
                    <input type="hidden" name="productId" value={item.id} />
                    <SubmitButton title={'Remove Item'} variant={'secondary'} />
                  </form>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6 border-t">
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-bold">{formatPrice(totalPrice)}</p>
            </div>
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
