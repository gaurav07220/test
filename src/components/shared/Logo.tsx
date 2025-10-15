
import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Back to homepage">
      <Zap className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg font-headline">Gaurav's Store</span>
    </Link>
  );
}
