
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Leaf, 
  TrendingUp, 
  DollarSign, 
  Share2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SustainabilityStats {
  carbonSaved: number;
  moneySaved: number;
  foodSaved: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

const SustainabilityStats: React.FC<{ stats: SustainabilityStats }> = ({ stats }) => {
  const shareProgress = () => {
    const message = `I've saved ${stats.carbonSaved}kg of CO2 and $${stats.moneySaved} by reducing food waste! 🌱 #FoodWise #Sustainability`;
    toast.success("Progress shared!");
    // Here we would integrate with social media sharing APIs
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Sustainability Impact</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={shareProgress}
        >
          <Share2 className="h-4 w-4" />
          Share Progress
        </Button>
      </div>

      <Card className="p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carbon Footprint Reduced</p>
              <p className="text-2xl font-medium">{stats.carbonSaved}kg CO₂</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Money Saved</p>
              <p className="text-2xl font-medium">${stats.moneySaved}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Food Waste Prevented</p>
              <p className="text-2xl font-medium">{stats.foodSaved} lbs</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm font-medium">Weekly Sustainability Goal</p>
          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}% of weekly goal reached
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SustainabilityStats;
