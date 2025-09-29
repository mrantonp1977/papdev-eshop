import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/helpers/formatPrice';
import { formatDate } from '@/lib/helpers/formatDate';
import { prisma } from '@/lib/prisma';

async function getData() {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return data;
}

export default async function productsPage() {
  const products = await getData();

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button asChild>
          <Link href="/dashboard/products/create">
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="border border-orange-500/60">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.images[0]}
                      alt="Product"
                      width={60}
                      height={60}
                      className="rounded-md h-16 w-16 object-cover"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block w-20 text-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        product.status === 'published'
                          ? 'bg-green-500 text-green-900'
                          : product.status === 'draft'
                          ? 'bg-amber-600 text-amber-900'
                          : 'bg-indigo-400 text-indigo-900'
                      }`}
                    >
                      {product.status.charAt(0).toUpperCase() +
                        product.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {product.isFeatured ? (
                      <span className="inline-block w-20 text-center px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-400 text-purple-900">
                        Featured
                      </span>
                    ) : (
                      <span className="inline-block w-20 text-center px-2 py-0.5 rounded-full text-xs text-black bg-gray-300">
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-green-400 font-bold">
                    {formatPrice(Number(product.price))}
                  </TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${product.id}`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/products/${product.id}/delete`}
                          >
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
