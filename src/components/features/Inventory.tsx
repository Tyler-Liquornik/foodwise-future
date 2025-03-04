
import React, { useState } from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ItemCard, { FoodItem } from '@/components/ui/ItemCard';
import { toast } from "sonner";

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for demonstration
  const inventoryItems: FoodItem[] = [
    {
      id: '1',
      name: 'Organic Milk',
      category: 'Dairy',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    },
    {
      id: '2',
      name: 'Apples',
      category: 'Fruit',
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    },
    {
      id: '3',
      name: 'Bread',
      category: 'Bakery',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      id: '4',
      name: 'Spinach',
      category: 'Vegetables',
      expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    },
    {
      id: '5',
      name: 'Yogurt',
      category: 'Dairy',
      expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    }
  ];
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col pt-16 pb-24 px-4 h-full">
      <div className="animate-slide-down">
        <div className="text-center my-6">
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
            Food Inventory
          </span>
          <h1 className="text-2xl font-display font-medium mt-2">
            Your Food Items
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track and manage your food inventory
          </p>
        </div>
      
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-9 bg-background/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => toast.info("Filters coming soon!")}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto no-scrollbar space-y-3 animate-slide-up">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="bg-muted/50 h-24 w-24 rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium">No items found</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              {searchTerm ? 
                "Try searching with different terms or categories" :
                "Your inventory is empty. Scan items to add them to your inventory."
              }
            </p>
            
            {!searchTerm && (
              <Button 
                variant="default" 
                className="mt-4 gap-2"
                onClick={() => toast.info("Navigate to the scan tab to add items")}
              >
                <PlusCircle className="h-4 w-4" />
                Add Items
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
