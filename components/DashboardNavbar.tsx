import { links } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

export function DashboardNavbar() {
  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
        {link.name}
        </Link>
      ))}
    </>
  )
}
