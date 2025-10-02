import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function SuccessPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex text-center">
            <Check className="mx-auto h-16 w-16 text-green-500 rounded-2xl" />
          </div>
          <div className="mt-6 text-center sm:mt-8 w-full">
            <h2 className="text-2xl font-semibold">
              Payment Successful !!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase! Your payment was successful.
            </p>
          </div>
          <div className="mt-6 text-center sm:mt-8 w-full">
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
