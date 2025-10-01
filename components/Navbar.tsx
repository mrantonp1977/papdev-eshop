import { ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { NavbarLinks } from './NavbarLinks';
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { UserDropdown } from './UserDropdown';
import { ModeToggle } from './Toggle-Mode';
import { Button } from './ui/button';
import { redis } from '@/lib/redis';
import { Cart } from '@/lib/interfaces';

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between backdrop-blur-md border-b-2 border-orange-500/20 bg-background/80 sticky top-0 z-10">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <ShoppingCart className="text-amber-400 mr-4 h-8 w-8" />
          <span className="text-3xl font-black italic bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent tracking-wider drop-shadow-md">
            PapDev Eshop
          </span>
        </Link>
      </div>

      <div className="">
        <NavbarLinks />
      </div>
      <div className="flex items-center gap-x-4">
        <div className="mr-6">
          <ModeToggle />
        </div>
        {user ? (
          <>
            <Link href={'/bag'} className="relative p-2 flex items-center mr-2">
              <ShoppingBag className="h-6 w-6 dark:text-indigo-400" />
              {total > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 text-white text-xs font-extrabold shadow-md">
                  {total}
                </span>
              )}
            </Link>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-5">
            <Button asChild variant={'outline'}>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
