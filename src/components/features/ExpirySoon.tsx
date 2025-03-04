
import React, { useState } from 'react';
import { Calendar, Filter, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard, { FoodItem } from '@/components/ui/ItemCard';
import { toast } from "sonner";

const ExpirySoon: React.FC = () => {
  const [activeTab, setActiveTab] = useState("soon");
  
  // Sample data for demonstration
  const expiringItems: FoodItem[] = [
    {
      id: '1',
      name: 'Yogurt',
      category: 'Dairy',
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    },
    {
      id: '2',
      name: 'Bread',
      category: 'Bakery',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    },
    {
      id: '3',
      name: 'Spinach',
      category: 'Vegetables',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
  ];
  
  const expiredItems: FoodItem[] = [
    {
      id: '4',
      name: 'Milk',
      category: 'Dairy',
      expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '5',
      name: 'Avocado',
      category: 'Fruit',
      expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  ];

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
            Expiry Tracker
          </span>
          <h1 className="text-2xl font-display font-medium mt-2">
            Expiring Soon
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Take action on food about to expire
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="soon">Expiring Soon</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="ml-2"
            onClick={() => toast.info("Filter options coming soon!")}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto no-scrollbar space-y-3">
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
              
              {expiringItems.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                />
              ))}
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
              
              {expiredItems.map(item => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                />
              ))}
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
      </div>
    </div>
  );
};

export default ExpirySoon;
