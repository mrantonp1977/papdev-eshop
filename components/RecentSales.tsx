import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/helpers/formatPrice';

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      id: true,
      amount: true,
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
    take: 5,
  });

  return data;
}

export async function RecentSales() {
  const data = await getData();
  return (
    <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {data.map((order) => (
          <div className="flex items-center gap-4 pb-4 border-b" key={order.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage 
              src={order.User?.profileImage || undefined}
              alt={`${order.User?.firstName} ${order.User?.lastName}`}
            />
            <AvatarFallback>
              {order.User?.firstName.charAt(0)}
              {order.User?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1 leading-none">
            <p className="font-medium">
              {order.User?.firstName} {order.User?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.User?.email}
            </p>
          </div>
          <p className="ml-auto font-medium text-green-600 dark:text-green-400">
            + {formatPrice(order.amount)}
          </p>
        </div>
        ))}
      </CardContent>
    </Card>
  );
}
