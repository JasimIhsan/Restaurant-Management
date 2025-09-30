import RestaurantCard from './RestaurantCard';
import { Loader2 } from 'lucide-react';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';

interface RestaurantListProps {
   restaurants: IRestaurant[];
   loading: boolean;
   onEdit: (restaurant: IRestaurant) => void;
}

export function RestaurantList({ restaurants, loading, onEdit }: RestaurantListProps) {
   console.log('Restau: ', restaurants);
   const handleDelete = async (id: number) => {
      try {
         console.log(id);

         // await restaurantService.deleteRestaurant(id);
         // setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      } catch (err) {
         console.error('Error deleting restaurant:', err);
      }
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading restaurants...</span>
         </div>
      );
   }

   if (restaurants.length === 0) {
      return (
         <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No restaurants found</p>
            <p className="text-muted-foreground text-sm mt-2">Click "Add Restaurant" to create your first restaurant</p>
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onEdit={onEdit} onDelete={handleDelete} />
         ))}
      </div>
   );
}
