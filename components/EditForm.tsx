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
import { ChevronLeftIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useActionState, useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { editProduct } from '@/lib/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { productSchema } from '@/lib/zodSchemas';
import Image from 'next/image';
import { categories } from '@/lib/constants';
import { SubmitButton } from '@/components/SubmitButtons';
import { $Enums } from '@prisma/client';

interface EditFormProps {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    isFeatured: boolean;
    status: $Enums.ProductStatus;
    category: $Enums.Category;
    images: string[];
  };
}

export function EditForm({ data }: EditFormProps) {
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useActionState(editProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form action={action} id={form.id} onSubmit={form.onSubmit}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="min-h-screen flex flex-col">
        {/* Top-left header */}
        <div className="flex items-center gap-3 p-6">
          <Button variant="outline" size="icon" className="rounded-md" asChild>
            <Link href="/dashboard/products">
              <ChevronLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>

        {/* Centered card */}
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-3xl p-6 border border-orange-500/60">
            <CardHeader>
              <CardTitle className="text-xl">Product Details</CardTitle>
              <CardDescription>
                Edit the details of your product below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={data.name}
                  />
                  <p className="text-sm text-red-400">{fields.name.errors}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter product description"
                    className="h-18"
                    key={fields.description.key}
                    name={fields.description.name}
                    defaultValue={data.description}
                  />
                  <p className="text-sm text-red-400">
                    {fields.description.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter product price"
                    key={fields.price.key}
                    name={fields.price.name}
                    defaultValue={data.price}
                    min="0"
                  />
                  <p className="text-sm text-red-400">{fields.price.errors}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Featured Product</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      key={fields.isFeatured.key}
                      name={fields.isFeatured.name}
                      defaultChecked={data.isFeatured}
                    />
                  </div>
                  <p className="text-sm text-red-400">
                    {fields.isFeatured.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Status</Label>
                  <Select
                    key={fields.status.key}
                    name={fields.status.name}
                    defaultValue={data.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-400">{fields.status.errors}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Category</Label>
                  <Select
                    key={fields.category.key}
                    name={fields.category.name}
                    defaultValue={data.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-400">
                    {fields.category.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-3 border p-4 rounded-xl">
                  <Label>Images</Label>
                  {images.length > 0 ? (
                    <div className="flex gap-5">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-[100px] h-[100px]"
                        >
                          <Image
                            src={image}
                            alt={'Product Image'}
                            fill
                            className="object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => handleDelete(index)}
                            type="button"
                            className="absolute -top-3 -right-3 bg-red-400 rounded-full p-1 shadow-lg"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                          <input
                            type="hidden"
                            key={fields.images.key}
                            name={fields.images.name}
                            value={image}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setImages(res.map((r) => r.ufsUrl));
                      }}
                      onUploadError={() => {
                        alert('Something went wrong');
                      }}
                    />
                  )}
                  <p className="text-sm text-red-400">{fields.images.errors}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant={'outline'} asChild>
                <Link href={'/dashboard/products'}>Cancel</Link>
              </Button>
              <SubmitButton title="Edit Product" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
}
