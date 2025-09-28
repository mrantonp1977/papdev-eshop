"use client";

import { links } from '@/lib/constants'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function DashboardNavbar() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={cn(
          link.href === pathname ? 'text-primary font-semibold' : ' hover:text-muted-foreground',
        )}>
        {link.name}
        </Link>
      ))}
    </>
  )
}
