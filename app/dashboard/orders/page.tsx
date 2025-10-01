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

export default function OrdersPage() {
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
            <TableRow>
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://i.pravatar.cc/300?u=john"
                    alt="John Doe"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    test@gmail.com
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                Sale
              </TableCell>
              <TableCell>
                <Badge variant={'outline'}>Published</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                25 Nov 2025
              </TableCell>
              <TableCell className="text-right font-medium">$245.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
