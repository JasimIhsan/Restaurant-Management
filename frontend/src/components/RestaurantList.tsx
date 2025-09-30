import { RestaurantCard } from './RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import React from 'react';

interface RestaurantListProps {
   restaurants: IRestaurant[];
   setRestaurants: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
   loading: boolean;
   onEdit: (restaurant: IRestaurant) => void;
}

export const RestaurantList = React.memo(({ restaurants, loading, onEdit, setRestaurants }: RestaurantListProps) => {
   // Show skeleton loading state
   if (loading) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading restaurants">
            {[...Array(6)].map((_, index) => (
               <div key={index} className="bg-card border border-border rounded-lg shadow-sm">
                  <div className="p-4">
                     <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-1/2" aria-hidden="true" />
                        <div className="flex gap-2">
                           <Skeleton className="h-8 w-8 rounded-full" aria-hidden="true" />
                           <Skeleton className="h-8 w-8 rounded-full" aria-hidden="true" />
                        </div>
                     </div>
                     <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                           <Skeleton className="h-4 w-4" aria-hidden="true" />
                           <Skeleton className="h-4 w-3/4" aria-hidden="true" />
                        </div>
                        <div className="flex items-center gap-2">
                           <Skeleton className="h-4 w-4" aria-hidden="true" />
                           <Skeleton className="h-4 w-1/3" aria-hidden="true" />
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      );
   }

   // Show empty state
   if (restaurants.length === 0) {
      return (
         <div className="text-center py-12" role="alert">
            <p className="text-muted-foreground text-lg">No restaurants found</p>
            <p className="text-muted-foreground text-sm mt-2">Click "Add Restaurant" to create your first restaurant</p>
         </div>
      );
   }

   // Render restaurant cards
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Restaurant list">
         {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onEdit={onEdit} setRestaurants={setRestaurants} />
         ))}
      </div>
   );
});
