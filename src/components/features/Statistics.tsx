
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, TrendingUp, Leaf, DollarSign, ChevronDown, Info, Factory } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

const Statistics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    carbon: false,
    money: false,
    food: false,
  });

  // Sample data for demonstration
  const wasteData = [
    { month: 'Jan', amount: 12 },
    { month: 'Feb', amount: 10 },
    { month: 'Mar', amount: 8 },
    { month: 'Apr', amount: 9 },
    { month: 'May', amount: 7 },
    { month: 'Jun', amount: 5 },
  ];
  
  const statsCards = [
    {
      id: "carbon",
      title: "Carbon Saved",
      value: "18.5 kg",
      description: "CO₂ emissions prevented",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      change: "+24%",
      positive: true,
      details: "Carbon emissions linked to food waste come from production, processing, packaging, transportation, and decomposition in landfills. Reducing food waste directly reduces these emissions.",
    },
    {
      id: "money",
      title: "Money Saved",
      value: "$187",
      description: "Estimated savings",
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      change: "+32%",
      positive: true,
      details: "This calculation is based on the average retail value of food items you've saved from waste. Better planning and consumption helps reduce grocery expenses over time.",
    },
    {
      id: "food",
      title: "Food Saved",
      value: "35 kg",
      description: "Food waste prevented",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      change: "+18%",
      positive: true,
      details: "This tracks the total weight of food saved from being wasted through better planning, storage, and consumption. Food waste accounts for approximately 8% of global greenhouse gas emissions.",
    },
  ];

  // Food impact data
  const highImpactFoods = [
    {
      name: "Beef",
      impact: "High",
      emissions: "60 kg CO₂e per kg",
      category: "negative",
      details: "Requires significant land, water, and feed. Produces methane, a potent greenhouse gas."
    },
    {
      name: "Lamb",
      impact: "High",
      emissions: "24 kg CO₂e per kg",
      category: "negative",
      details: "High methane emissions, large land and water footprint."
    },
    {
      name: "Cheese",
      impact: "High",
      emissions: "13 kg CO₂e per kg",
      category: "negative",
      details: "Dairy production has high resource requirements and emissions."
    },
    {
      name: "Lentils",
      impact: "Low",
      emissions: "0.9 kg CO₂e per kg",
      category: "positive",
      details: "Efficient protein source with minimal water and land requirements."
    },
    {
      name: "Tofu",
      impact: "Low",
      emissions: "2 kg CO₂e per kg",
      category: "positive",
      details: "Plant-based protein with substantially lower emissions than animal sources."
    },
    {
      name: "Seasonal Vegetables",
      impact: "Low",
      emissions: "0.5 kg CO₂e per kg",
      category: "positive",
      details: "Local, seasonal vegetables minimize transportation and storage emissions."
    }
  ];

  const toggleSection = (id: string) => {
    setOpenSections({
      ...openSections,
      [id]: !openSections[id]
    });
  };

  const filteredFoods = highImpactFoods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.impact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col pt-16 pb-24 px-4 h-full overflow-auto no-scrollbar">
      <div className="animate-slide-down">
        <div className="text-center my-6">
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
            Impact Tracking
          </span>
          <h1 className="text-2xl font-display font-medium mt-2">
            Your Impact
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track how you're reducing food waste
          </p>
        </div>
        
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => toast.info("Sharing functionality coming soon!")}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="space-y-6 animate-slide-up pb-4">
        {/* Stats Cards with Collapsible Explanations */}
        <div className="grid grid-cols-1 gap-4">
          {statsCards.map((card) => (
            <Collapsible 
              key={card.id}
              open={openSections[card.id]} 
              onOpenChange={() => toggleSection(card.id)}
              className="w-full"
            >
              <Card className="p-4 border border-border/50 shadow-soft">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <h3 className="text-2xl font-display font-medium mt-1">{card.value}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs font-medium ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {card.change} from last month
                  </span>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${openSections[card.id] ? 'rotate-180' : ''}`} 
                      />
                      <span className="sr-only">Toggle explanation</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                  {card.details}
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
        
        {/* Waste Reduction Chart */}
        <Card className="p-4 border border-border/50 shadow-soft">
          <h3 className="font-medium mb-4">Food Waste Reduction</h3>
          <div className="h-64 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="amount" name="Food Waste (kg)" fill="#1A9F48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Your food waste has decreased by 58% over the last 6 months
          </p>
        </Card>
        
        {/* Food Impact Section */}
        <Card className="p-4 border border-border/50 shadow-soft">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Food Environmental Impact</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Foods have different environmental impacts due to how they're grown, processed, and transported. Switching to lower-impact foods can significantly reduce your carbon footprint.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Search foods by name or impact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground pb-1 border-b">
              <div>Food</div>
              <div>Impact</div>
              <div>CO₂ Emissions</div>
            </div>
            
            {filteredFoods.length === 0 ? (
              <p className="text-sm text-center py-4 text-muted-foreground">No foods match your search</p>
            ) : (
              filteredFoods.map((food, index) => (
                <Collapsible key={index} className="w-full">
                  <div className="grid grid-cols-3 text-sm items-center py-2 border-b border-border/30">
                    <div className="flex items-center gap-2">
                      {food.category === "negative" ? (
                        <Factory className="h-4 w-4 text-red-500" />
                      ) : (
                        <Leaf className="h-4 w-4 text-green-500" />
                      )}
                      <span>{food.name}</span>
                    </div>
                    <div>
                      <span 
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          food.impact === "High" 
                            ? "bg-red-100 text-red-700" 
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {food.impact}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{food.emissions}</span>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Details</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  <CollapsibleContent className="pl-6 pr-2 py-2 text-sm text-muted-foreground bg-muted/30 rounded-md mt-1">
                    {food.details}
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </div>
        </Card>
        
        {/* Environmental Impact */}
        <Card className="p-4 border border-border/50 shadow-soft">
          <h3 className="font-medium mb-2">Environmental Impact</h3>
          <p className="text-sm text-muted-foreground mb-4">
            By reducing food waste, you've made a real difference:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Saved 18,500 liters of water</p>
                <p className="text-xs text-muted-foreground">
                  Equivalent to 123 full bathtubs
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Prevented 18.5 kg of CO₂ emissions</p>
                <p className="text-xs text-muted-foreground">
                  Equivalent to driving 74 km in an average car
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Saved resources used in food production</p>
                <p className="text-xs text-muted-foreground">
                  Including land, fertilizers, and transportation
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
