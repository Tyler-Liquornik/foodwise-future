
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Scan, ShoppingBasket, Utensils, BarChart2 } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Scan, label: 'Scan', path: '/' },
    { icon: ShoppingBasket, label: 'Inventory', path: '/inventory' },
    { icon: Utensils, label: 'Recipes', path: '/recipes' },
    { icon: BarChart2, label: 'Stats', path: '/stats' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className="flex flex-col items-center justify-center w-1/4 h-full"
            >
              <div 
                className={cn(
                  "flex flex-col items-center justify-center transition-all duration-300 space-y-1",
                  isActive ? "text-primary scale-105" : "text-muted-foreground"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
