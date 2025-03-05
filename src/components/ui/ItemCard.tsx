
import React from 'react';
import { cn } from '@/lib/utils';
import { format, differenceInDays } from 'date-fns';
import { Clock, AlertTriangle, Check, Square } from 'lucide-react';

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  expiryDate: Date;
  imageUrl?: string;
  consumed?: boolean;
}

interface ItemCardProps {
  item: FoodItem;
  className?: string;
  onToggleConsumed?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, className, onToggleConsumed }) => {
  const daysToExpiry = differenceInDays(item.expiryDate, new Date());
  
  const getExpiryStatusColor = () => {
    if (daysToExpiry < 0) return "text-destructive";
    if (daysToExpiry <= 2) return "text-amber-500";
    if (daysToExpiry <= 5) return "text-amber-400";
    return "text-green-500";
  };
  
  const getExpiryText = () => {
    if (daysToExpiry < 0) return `Expired ${Math.abs(daysToExpiry)} ${Math.abs(daysToExpiry) === 1 ? 'day' : 'days'} ago`;
    if (daysToExpiry === 0) return "Expires today";
    if (daysToExpiry === 1) return "Expires tomorrow";
    return `Expires in ${daysToExpiry} days`;
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleConsumed) {
      onToggleConsumed(item.id);
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg p-4 shadow-soft border border-border/50 card-hover",
      item.consumed && "opacity-60",
      className
    )}>
      <div className="flex items-center space-x-3">
        <div 
          className="cursor-pointer mr-1 text-primary" 
          onClick={handleCheckboxClick}
        >
          {item.consumed ? (
            <Check className="h-5 w-5" />
          ) : (
            <Square className="h-5 w-5" />
          )}
        </div>
        
        <div className="h-16 w-16 rounded-md bg-secondary flex items-center justify-center overflow-hidden">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-2xl text-secondary-foreground">{item.name.charAt(0)}</div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={cn(
            "font-medium text-foreground line-clamp-1",
            item.consumed && "line-through"
          )}>
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground">{item.category}</p>
          
          <div className={cn(
            "flex items-center mt-1 text-xs font-medium",
            getExpiryStatusColor()
          )}>
            {daysToExpiry < 0 ? (
              <AlertTriangle className="h-3 w-3 mr-1" />
            ) : (
              <Clock className="h-3 w-3 mr-1" />
            )}
            <span>{getExpiryText()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
