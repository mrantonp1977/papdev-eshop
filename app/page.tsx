import { Button } from '@/components/ui/button';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Button asChild>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </div>
  );
}
