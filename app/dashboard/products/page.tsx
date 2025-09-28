'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/helpers/formatPrice';
import { formatDate } from '@/lib/helpers/formatDate';

type Product = {
  id: string;
  name: string;
  status: string;
  isFeatured: boolean;
  category: string;
  price: string | number;
  images: string[];
  createdAt: string;
};

export default function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 6;

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products?page=${page}&pageSize=${pageSize}`);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
    }
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

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
          <CardDescription>Manage your products and view performance.</CardDescription>
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
                    <Image src={product.images[0]} alt="Product" width={60} height={60} className="rounded-md h-16 w-16 object-cover" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <span className={`inline-block w-20 text-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                      product.status === 'published'
                        ? 'bg-green-500 text-green-900'
                        : product.status === 'draft'
                        ? 'bg-amber-600 text-amber-900'
                        : 'bg-indigo-400 text-indigo-900'
                    }`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
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
                  <TableCell className="text-green-400 font-bold">{formatPrice(Number(product.price))}</TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <Button variant={"ghost"} disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={i + 1 === page ? 'default' : 'outline'}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button variant={"ghost"} disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
