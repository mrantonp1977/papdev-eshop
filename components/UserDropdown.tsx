import Link from "next/link";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { userDbEmail } from "@/lib/constants";

interface UserDropdownProps {
  email: string;
  name: string;
  userImage: string;
};



export function UserDropdown({ email, name, userImage }: UserDropdownProps) {
  const isAdmin = email === userDbEmail;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="relative w-5 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userImage} alt={name} />
            <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <p className="text-sm leading-none font-medium">
            {name}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
