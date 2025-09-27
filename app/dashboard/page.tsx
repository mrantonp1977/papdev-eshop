import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EuroIcon, PartyPopper, ShoppingBag, User2Icon } from "lucide-react"
import React from "react"

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-medium text-muted-foreground">
            Total Revenue
          </CardTitle>
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/40">
            <EuroIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            145,000 €
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Based on 100 charges
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-medium text-muted-foreground">
            Total Sales
          </CardTitle>
          <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
            <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            +50
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Total sales for my store
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-medium text-muted-foreground">
            Total Products
          </CardTitle>
          <div className="rounded-full bg-cyan-100 p-2 dark:bg-cyan-900/40">
            <PartyPopper className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            234
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Total products in my store
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-medium text-muted-foreground">
            Total Users
          </CardTitle>
          <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/40">
            <User2Icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            364
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Total users in my store
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
