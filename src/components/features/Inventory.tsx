
import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Calendar, Lightbulb, Apple, Milk, Carrot, Wheat, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard, { FoodItem } from '@/components/ui/ItemCard';
import { toast } from "sonner";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

// Define food groups and their icons
const foodGroups = [
  { id: 'all', name: 'All Items', icon: <Check className="h-4 w-4" /> },
  { id: 'Fruit', name: 'Fruits', icon: <Apple className="h-4 w-4" /> },
  { id: 'Dairy', name: 'Dairy', icon: <Milk className="h-4 w-4" /> },
  { id: 'Vegetables', name: 'Vegetables', icon: <Carrot className="h-4 w-4" /> },
  { id: 'Bakery', name: 'Bakery', icon: <Wheat className="h-4 w-4" /> },
];

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFoodGroup, setSelectedFoodGroup] = useState('all');
  const [inventoryItems, setInventoryItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Organic Milk',
      category: 'Dairy',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      consumed: false
    },
    {
      id: '2',
      name: 'Apple',
      category: 'Fruit',
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      consumed: false
    },
    {
      id: '3',
      name: 'Bread',
      category: 'Bakery',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      imageUrl: 'https://www.theperfectloaf.com/wp-content/uploads/2023/05/theperfectloaf_ai_generated_sourdough_bread_recipe_featured-1920x1280.jpg',
      consumed: false
    },
    {
      id: '4',
      name: 'Spinach',
      category: 'Vegetables',
      expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      consumed: false
    },
    {
      id: '5',
      name: 'Yogurt',
      category: 'Dairy',
      expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9ndXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      consumed: false
    }
  ]);
  
  const toggleItemConsumed = (id: string) => {
    setInventoryItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, consumed: !item.consumed } : item
      )
    );
    
    const item = inventoryItems.find(item => item.id === id);
    if (item) {
      toast.success(
        item.consumed ? `Unmarked ${item.name}` : `Marked ${item.name} as consumed`, 
        { duration: 2000 }
      );
    }
  };
  
  // Apply all filters: search, tab (expiry status) and food group
  const applyFilters = () => {
    // First filter by search term
    let filtered = inventoryItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Then filter by food group if not 'all'
    if (selectedFoodGroup !== 'all') {
      filtered = filtered.filter(item => item.category === selectedFoodGroup);
    }
    
    // Then apply the tab filters (expiry status)
    if (activeTab === "soon") {
      return filtered.filter(item => {
        const daysToExpiry = Math.floor((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysToExpiry >= 0 && daysToExpiry <= 3;
      });
    } else if (activeTab === "expired") {
      return filtered.filter(item => {
        const daysToExpiry = Math.floor((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysToExpiry < 0;
      });
    }
    
    return filtered;
  };
  
  const filteredItems = applyFilters();
  
  // Calculate counts for the tabs separately
  const expiringItems = inventoryItems.filter(item => {
    const daysToExpiry = Math.floor((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysToExpiry >= 0 && daysToExpiry <= 3;
  });
  
  const expiredItems = inventoryItems.filter(item => {
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
        
        {/* Food Group Selection */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4 no-scrollbar">
          {foodGroups.map((group) => (
            <Button
              key={group.id}
              variant={selectedFoodGroup === group.id ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1.5 whitespace-nowrap"
              onClick={() => setSelectedFoodGroup(group.id)}
            >
              {group.icon}
              <span>{group.name}</span>
            </Button>
          ))}
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
              <span className="text-xs sm:text-base">All Items</span>
              {inventoryItems.length > 0 && (
                  <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-green-200">
                  {inventoryItems.length}
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
              <span className="text-xs sm:text-base">Expiring Soon</span>
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
              <span className="text-xs sm:text-base">Expired</span>
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
                    onToggleConsumed={toggleItemConsumed}
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
                  {searchTerm || selectedFoodGroup !== 'all' ? 
                    "Try searching with different terms or categories" :
                    "Your inventory is empty. Scan items to add them to your inventory."
                  }
                </p>
                
                {!searchTerm && selectedFoodGroup === 'all' && (
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
            {filteredItems.length > 0 ? (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800">Action needed</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        You have {filteredItems.length} items expiring within 3 days.
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
                  {filteredItems.map(item => (
                    <ItemCard 
                      key={item.id} 
                      item={item} 
                      onToggleConsumed={toggleItemConsumed}
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
            {filteredItems.length > 0 ? (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-800">Items expired</h3>
                      <p className="text-sm text-red-700 mt-1">
                        {filteredItems.length} items have expired. Consider proper disposal or check if they're still usable.
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
                  {filteredItems.map(item => (
                    <ItemCard 
                      key={item.id} 
                      item={item}
                      onToggleConsumed={toggleItemConsumed}
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
