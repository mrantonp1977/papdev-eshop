'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeftIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useActionState, useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { createBanner } from '@/lib/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { bannerSchema } from '@/lib/zodSchemas';
import Image from 'next/image';
import { SubmitButton } from '@/components/SubmitButtons';

export default function BannerPage() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [lastResult, action] = useActionState(createBanner, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form action={action} id={form.id} onSubmit={form.onSubmit}>
      <div className="min-h-screen flex flex-col">
        {/* Top-left header */}
        <div className="flex items-center gap-3 p-6">
          <Button variant="outline" size="icon" className="rounded-md" asChild>
            <Link href="/dashboard/banner">
              <ChevronLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">New Banner</h1>
        </div>

        {/* Centered card */}
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-3xl p-6 border border-blue-500/60">
            <CardHeader>
              <CardTitle className="text-xl">Create New Banner</CardTitle>
              <CardDescription>
                Fill in the details below to add a new banner to your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter banner name"
                    name={fields.title.name}
                    key={fields.title.key}
                    defaultValue={fields.title.initialValue}
                  />
                  <p className="text-sm text-red-400">{fields.title.errors}</p>
                </div>
                <div className="flex flex-col gap-3 border p-4 rounded-xl">
                  <Label>Image</Label>
                  <input
                    type="hidden"
                    value={image ?? ''}
                    key={fields.imageString.key}
                    name={fields.imageString.name}
                    defaultValue={fields.imageString.initialValue}
                  />
                  {image !== undefined ? (
                    <Image
                      src={image}
                      alt="Banner Image"
                      width={200}
                      height={200}
                      className="rounded-lg w-[200px] h-[200px] object-cover border"
                    />
                  ) : (
                    <UploadDropzone
                      endpoint="bannerUploader"
                      onClientUploadComplete={(res) => {
                        setImages(res[0].ufsUrl);
                      }}
                      onUploadError={() => {
                        alert('Something went wrong');
                      }}
                    />
                  )}
                  <p className="text-sm text-red-400">
                    {fields.imageString.errors}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant={'outline'} asChild>
                <Link href={'/dashboard/banner'}>Cancel</Link>
              </Button>
              <SubmitButton title="Create Banner" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
}
