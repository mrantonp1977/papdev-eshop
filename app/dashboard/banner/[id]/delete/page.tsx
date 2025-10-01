import { SubmitButton } from '@/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { deleteBanner } from '@/lib/actions';
import Link from 'next/link';
import React from 'react';

export default function DeleteBannerPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center ">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl border border-orange-500/60">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Are you sure?</CardTitle>
          <CardDescription className="text-base text-gray-300">
            This action cannot be undone. Deleting this banner will remove it
            permanently.
          </CardDescription>
        </CardHeader>

        <CardFooter className="w-full flex justify-center gap-4 mt-6">
          <Button asChild variant="outline" className="px-6 py-2 rounded-lg">
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={params.id} />
            <SubmitButton
              title="Delete"
              variant="destructive"
              className="px-6 py-2 rounded-lg"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
