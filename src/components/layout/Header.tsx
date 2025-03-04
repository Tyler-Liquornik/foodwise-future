
import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-center px-6 glass-effect",
      className
    )}>
      <div className="flex items-center space-x-2">
        <Leaf className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-display font-medium">
          <span className="text-primary">Food</span>
          <span>Wise</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
