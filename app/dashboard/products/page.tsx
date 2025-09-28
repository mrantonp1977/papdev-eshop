import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ProductsPage() {
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href="/dashboard/products/create">
            <PlusCircle className="mr-1 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <Card className="mt-8 border border-orange-500/60">
        <CardHeader>
          <CardTitle className="text-2xl">Products</CardTitle>
          <CardDescription>
            Manage your products here and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Image 
                    src="/Photo139.jpg"
                    alt="Product Image"
                    width={60}
                    height={60}
                    className="rounded-md mt-2"
                  />
                </TableCell>
                <TableCell>Sample Product</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>$29.99</TableCell>
                <TableCell>2024-06-15</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                         <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
