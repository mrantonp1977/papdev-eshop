'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  title: string;
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'destructive'
    | 'ghost'
    | 'link';
  className?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
  icon?: React.ReactNode; // ✅ new prop for icons
};

export function SubmitButton({
  title,
  variant = 'default',
  className,
  formAction,
  icon,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      className={className}
      disabled={pending}
      formAction={formAction}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>} {/* ✅ put icon inside */}
          {title}
        </>
      )}
    </Button>
  );
}
