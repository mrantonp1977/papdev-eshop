import React from 'react';
import { DashboardNavbar } from '@/components/DashboardNavbar';
import { ModeToggle } from '@/components/Toggle-Mode';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CircleUserIcon, MenuIcon, ShoppingCart } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { userDbEmail } from '@/lib/constants';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== userDbEmail) {
    redirect('/');
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-18 items-center justify-between bg-background/80 backdrop-blur-md border-b-2 border-orange-500/20 px-2 sm:px-4 lg:px-6">
        {/* Left: Logo / Title */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <ShoppingCart className="text-amber-400 mr-4 h-8 w-8" />
            <span className="text-3xl font-black italic bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent tracking-wider drop-shadow-md">
              ShopItAll
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navbar */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8 font-medium text-sm lg:text-base">
          <DashboardNavbar />
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar (only visible on small screens) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:w-72">
              <SheetTitle className="mt-4 px-4 text-lg font-semibold">
                ShopItAll
              </SheetTitle>
              <Separator className="my-2" />
              <nav className="mt-4 flex flex-col gap-4 px-4 font-medium">
                <DashboardNavbar />
              </nav>
            </SheetContent>
          </Sheet>

          {/* Dark/Light Mode Toggle */}
          <ModeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="rounded-full p-1 hover:bg-accent transition-colors"
                aria-label="User menu"
              >
                <CircleUserIcon className="h-6 w-6 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-sm font-medium">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutLink>Sign out</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 py-6">{children}</main>
    </div>
  );
}
