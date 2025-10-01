import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
