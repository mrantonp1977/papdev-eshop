import { Navbar } from '@/components/Navbar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {children}
      </main>
    </div>
  );
}
