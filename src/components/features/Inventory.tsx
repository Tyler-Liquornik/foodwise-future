import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Calendar, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard, { FoodItem } from '@/components/ui/ItemCard';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  
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
  
  const expiringItems = filteredItems.filter(item => {
    const daysToExpiry = Math.floor((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysToExpiry >= 0 && daysToExpiry <= 3;
  });
  
  const expiredItems = filteredItems.filter(item => {
    const daysToExpiry = Math.floor((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysToExpiry < 0;
  });

  const showRecipeIdeas = () => {
    toast.success("Recipe ideas generated!", { 
      description: "We found 3 recipes you can make with your expiring items.",
      action: {
        label: "View",
        onClick: () => console.log("View recipes"),
      },
    });
  };

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
      
        <div className="flex gap-2 mb-4">
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="all" 
              className={cn(
                "transition-colors",
                activeTab === "all" 
                  ? "bg-green-50 text-green-700 data-[state=active]:bg-green-100" 
                  : "hover:text-green-600 hover:bg-green-50/50"
              )}
            >
              All Items
              {filteredItems.length > 0 && (
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-green-200">
                  {filteredItems.length}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="soon" 
              className={cn(
                "transition-colors",
                activeTab === "soon" 
                  ? "bg-amber-50 text-amber-700 data-[state=active]:bg-amber-100" 
                  : "hover:text-amber-600 hover:bg-amber-50/50"
              )}
            >
              Expiring Soon
              {expiringItems.length > 0 && (
                <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-700 border-amber-200">
                  {expiringItems.length}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="expired" 
              className={cn(
                "transition-colors",
                activeTab === "expired" 
                  ? "bg-red-50 text-red-700 data-[state=active]:bg-red-100" 
                  : "hover:text-red-600 hover:bg-red-50/50"
              )}
            >
              Expired
              {expiredItems.length > 0 && (
                <Badge variant="outline" className="ml-2 bg-red-100 text-red-700 border-red-200">
                  {expiredItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="all" className="animate-slide-up mt-0">
            {filteredItems.length > 0 ? (
              <div className="space-y-3">
                {filteredItems.map(item => (
                  <ItemCard 
                    key={item.id} 
                    item={item} 
                  />
                ))}
              </div>
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
          </TabsContent>
          
          <TabsContent value="soon" className="animate-slide-up mt-0">
            {expiringItems.length > 0 ? (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800">Action needed</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        You have {expiringItems.length} items expiring within 3 days.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-amber-700 border-amber-300 bg-amber-100/50 hover:bg-amber-100"
                        onClick={showRecipeIdeas}
                      >
                        Get Recipe Ideas
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {expiringItems.map(item => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="bg-muted/50 h-24 w-24 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-medium">No expiring items</h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                  All your food items are safe for now. Great job managing your inventory!
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired" className="animate-slide-up mt-0">
            {expiredItems.length > 0 ? (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">Items expired</h3>
                      <p className="text-sm text-red-700 mt-1">
                        {expiredItems.length} items have expired. Consider proper disposal or check if they're still usable.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-red-700 border-red-300 bg-red-100/50 hover:bg-red-100"
                        onClick={() => toast.info("Disposal options coming soon!")}
                      >
                        Disposal Options
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {expiredItems.map(item => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="bg-muted/50 h-24 w-24 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-medium">No expired items</h3>
                <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                  You don't have any expired items. Keep up the good work!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Inventory;
