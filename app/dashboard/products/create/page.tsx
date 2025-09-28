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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';

export default function ProductCreatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top-left header */}
      <div className="flex items-center gap-3 p-6">
        <Button variant="outline" size="icon" className="rounded-md" asChild>
          <Link href="/dashboard/products">
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">New Product</h1>
      </div>

      {/* Centered card */}
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-3xl p-6 border border-orange-500/60">
          <CardHeader>
            <CardTitle className="text-lg">Create New Product</CardTitle>
            <CardDescription>
              Fill in the details below to add a new product to your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input type="text" placeholder="Enter product name" />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter product description"
                  className="h-18"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input type="number" placeholder="Enter product price" />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Featured Product</Label>
                <Switch />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 border p-4 rounded-xl">
                <Label>Images</Label>
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={() => {
                    alert('Upload complete');
                  }}
                  onUploadError={() => {
                    alert('Something went wrong');
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-end gap-4'>
            
            <Button variant={"outline"} asChild>
              <Link href={"/dashboard/products"}>
              Cancel
              </Link>
            </Button>
            <Button type='submit'>Create Product</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
