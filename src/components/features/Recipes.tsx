import React, { useState } from 'react';
import { Search, Utensils, Clock, Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  category: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite: boolean;
}

const Recipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  
  // Sample recipes data
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Vegetable Stir Fry',
      image: 'https://gatheringdreams.com/wp-content/uploads/2022/05/Vegetable-Stir-Fry-Noodles-recipe-square.jpg',
      prepTime: 10,
      cookTime: 15,
      ingredients: ['Broccoli', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Garlic'],
      category: 'Main Dish',
      tags: ['Vegetarian', 'Quick', 'Healthy'],
      difficulty: 'Easy',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Pasta with Spinach',
      image: 'https://vancouverwithlove.com/wp-content/uploads/2023/07/vegan-spinach-pasta-sauce-featured-500x500.jpg',
      prepTime: 5,
      cookTime: 15,
      ingredients: ['Pasta', 'Spinach', 'Garlic', 'Olive Oil', 'Parmesan'],
      category: 'Main Dish',
      tags: ['Vegetarian', 'Quick', 'Pasta'],
      difficulty: 'Easy',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Berry Smoothie Bowl',
      image: 'https://www.whollytasteful.com/wp-content/uploads/2023/05/strawberry-smoothie-bowl-featured-500x500.jpg',
      prepTime: 10,
      cookTime: 0,
      ingredients: ['Frozen Berries', 'Banana', 'Yogurt', 'Honey', 'Granola'],
      category: 'Breakfast',
      tags: ['Vegetarian', 'No-Cook', 'Healthy'],
      difficulty: 'Easy',
      isFavorite: true
    },
    {
      id: '4',
      title: 'Avocado Toast',
      image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      prepTime: 5,
      cookTime: 5,
      ingredients: ['Bread', 'Avocado', 'Eggs', 'Salt', 'Pepper'],
      category: 'Breakfast',
      tags: ['Vegetarian', 'Quick', 'Healthy'],
      difficulty: 'Easy',
      isFavorite: false
    }
  ];
  
  // Filter recipes based on search term and favorite filter
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recipe.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         recipe.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
                         
    if (favoriteFilter) {
      return matchesSearch && recipe.isFavorite;
    }
    
    return matchesSearch;
  });
  
  const toggleFavorite = (id: string) => {
    toast.success("Recipe saved to favorites!");
    // In a real app, this would update the state
  };
  
  const viewRecipe = (id: string) => {
    toast.info("Recipe details coming soon!");
  };

  return (
    <div className="flex flex-col pt-16 pb-24 px-4 h-full">
      <div className="animate-slide-down">
        <div className="text-center my-6">
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
            Recipe Suggestions
          </span>
          <h1 className="text-2xl font-display font-medium mt-2">
            Food Waste Recipes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Delicious ideas to use up ingredients before they expire
          </p>
        </div>
      
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes or ingredients..."
              className="pl-9 bg-background/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant={favoriteFilter ? "default" : "outline"}
            size="icon"
            onClick={() => setFavoriteFilter(!favoriteFilter)}
            className={favoriteFilter ? "bg-pink-500 hover:bg-pink-600" : ""}
          >
            <Heart className={`h-4 w-4 ${favoriteFilter ? "fill-white" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => toast.info("More filters coming soon!")}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto no-scrollbar space-y-4 animate-slide-up">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <Card key={recipe.id} className="overflow-hidden shadow-soft border border-border/50 card-hover">
              <div className="flex">
                <div className="w-24 h-24 bg-secondary flex-shrink-0">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg text-foreground">{recipe.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-0.5 space-x-3">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {recipe.prepTime + recipe.cookTime} min
                        </span>
                        <span className="flex items-center">
                          <Utensils className="h-3 w-3 mr-1" />
                          {recipe.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {recipe.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleFavorite(recipe.id)}
                    >
                      <Heart className={`h-4 w-4 ${recipe.isFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
                    </Button>
                  </div>
                  <div className="flex mt-2 justify-end">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => viewRecipe(recipe.id)}
                    >
                      View Recipe
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="bg-muted/50 h-24 w-24 rounded-full flex items-center justify-center mb-4">
              <Utensils className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium">No recipes found</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              {searchTerm ? 
                "Try searching with different terms or ingredients" :
                "We couldn't find any recipes. Try adding some items to your inventory first."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
