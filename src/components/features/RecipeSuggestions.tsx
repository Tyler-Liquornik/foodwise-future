
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Utensils, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Ingredient {
  name: string;
  expiryDate: Date;
  isExpiringSoon: boolean;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  expiryScore: number; // Higher means uses more expiring ingredients
}

const RecipeSuggestions: React.FC<{ ingredients: Ingredient[] }> = ({ ingredients }) => {
  // This would normally come from an API based on the ingredients
  const suggestedRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Quick Stir Fry',
      ingredients: [
        { name: 'Bell Peppers', expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), isExpiringSoon: true },
        { name: 'Carrots', expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), isExpiringSoon: false }
      ],
      prepTime: 20,
      difficulty: 'Easy',
      expiryScore: 0.8
    },
    // ... more recipes would be generated based on inventory
  ].sort((a, b) => b.expiryScore - a.expiryScore); // Sort by expiry score

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">AI-Suggested Recipes</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => toast.info("Refreshing recipe suggestions...")}
        >
          Refresh
        </Button>
      </div>

      {suggestedRecipes.map((recipe) => (
        <Card key={recipe.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{recipe.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {recipe.prepTime} min
                </span>
                <span className="flex items-center">
                  <Utensils className="h-4 w-4 mr-1" />
                  {recipe.difficulty}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <Badge 
                    key={index}
                    variant={ingredient.isExpiringSoon ? "destructive" : "secondary"}
                  >
                    {ingredient.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toast.success("Recipe saved!")}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecipeSuggestions;
