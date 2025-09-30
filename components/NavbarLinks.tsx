'use client';

import { navbarLinks } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavbarLinks() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center gap-x-8 ">
      {navbarLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-md font-semibold"
        >
          <span
            className={
              pathname === item.href
                ? 'text-blue-500'
                : 'dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400'
            }
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
