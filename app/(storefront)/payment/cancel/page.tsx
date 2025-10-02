import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CancelPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-600 rounded-2xl" />
          </div>
          <div className="mt-6 text-center sm:mt-8 w-full">
            <h2 className="text-2xl font-semibold">Payment Cancelled</h2>
            <p className="mt-2 text-muted-foreground">
              Your payment was not successful. Please try again.
            </p>
          </div>
          <div className="mt-6 text-center sm:mt-8 w-full">
            <Button asChild variant="default" className="w-full">
              <Link href="/bag">Back to bag</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
