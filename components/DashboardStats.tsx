import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EuroIcon, PartyPopper, ShoppingBag, User2Icon } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/helpers/formatPrice';
import { RecentSales } from './RecentSales';
import { Chart } from './Chart';
import { formatDate } from '@/lib/helpers/formatDate';

async function getOrders() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startOfYear,
        lte: now,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const revenueByDate: Record<string, number> = {};

  data.forEach((order) => {
    const date = formatDate(order.createdAt); // e.g., "2025-10-02"
    if (!revenueByDate[date]) revenueByDate[date] = 0;
    revenueByDate[date] += order.amount;
  });

  // Convert to chart-friendly array
  const result = Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue: revenue.toString(),
  }));

  return result;
}

async function getData() {
  const [user, products, orders] = await Promise.all([
    await prisma.user.findMany({
      select: {
        id: true,
      },
    }),
    await prisma.product.findMany({
      select: {
        id: true,
      },
    }),
    await prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { user, products, orders };
}

export async function DashboardStats() {
  const { user, products, orders } = await getData();
  const totalAmount = orders.reduce((acc, currentValue) => {
    return acc + currentValue.amount;
  }, 0);
  const order = await getOrders();

  return (
    <div className="p-6 md:p-8 space-y-16">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Total Revenue
            </CardTitle>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/40">
              <EuroIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(totalAmount)}
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Based on 100 charges
            </p>
          </CardContent>
        </Card>

        {/* Total Sales */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold  text-muted-foreground">
              Total Sales
            </CardTitle>
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/40">
              <ShoppingBag className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              +{orders.length}
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Total sales for my store
            </p>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Total Products
            </CardTitle>
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/40">
              <PartyPopper className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {products.length}
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Products available
            </p>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="shadow-orange-700 shadow-md transition-all duration-200 border border-border/60">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
              <User2Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user.length}
            </p>
            <p className="text-sm font-md text-muted-foreground mt-1">
              Registered customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions & Recent Sales */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Transactions Card */}
        <Card className="xl:col-span-2 shadow-orange-700 shadow-md transition-all duration-200 border border-border/60 ">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Transactions
            </CardTitle>
            <CardDescription>Last 12 months revenue overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-104 w-full flex items-center justify-center text-muted-foreground text-sm font-semibold">
              <Chart data={order} />
            </div>
          </CardContent>
        </Card>
        <RecentSales />
      </div>
    </div>
  );
}
