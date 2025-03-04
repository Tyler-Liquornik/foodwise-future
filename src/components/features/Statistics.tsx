
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, TrendingUp, Leaf, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from "sonner";

const Statistics: React.FC = () => {
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
      title: "Carbon Saved",
      value: "18.5 kg",
      description: "CO₂ emissions prevented",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      change: "+24%",
      positive: true,
    },
    {
      title: "Money Saved",
      value: "$187",
      description: "Estimated savings",
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      change: "+32%",
      positive: true,
    },
    {
      title: "Food Saved",
      value: "35 kg",
      description: "Food waste prevented",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      change: "+18%",
      positive: true,
    },
  ];

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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4">
          {statsCards.map((card, index) => (
            <Card key={index} className="p-4 border border-border/50 shadow-soft">
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
              <div className={`text-xs font-medium mt-2 ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                {card.change} from last month
              </div>
            </Card>
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
