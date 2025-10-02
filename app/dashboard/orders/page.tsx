import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/helpers/formatDate';
import { formatPrice } from '@/lib/helpers/formatPrice';

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export default async function OrdersPage() {
  const orders = await getData();
  return (
    <Card className="mt-8 border border-orange-500/60">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-xl font-semibold">Orders</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Manage all your customer orders here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={order.User?.profileImage || undefined}
                      alt="John Doe"
                    />
                    <AvatarFallback>
                      {order.User?.firstName?.[0]}
                      {order.User?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {order.User?.firstName} {order.User?.lastName}
                    </p>
                    <p className="hidden md:flex text-sm text-muted-foreground">
                      {order.User?.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  Order
                </TableCell>
                <TableCell>
                  <Badge variant={'default'} className="rounded-full px-3 py-1">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(order.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
