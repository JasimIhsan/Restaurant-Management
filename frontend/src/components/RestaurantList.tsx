import { RestaurantCard } from './RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import { deleteRestaurant } from '@/api/restaurant.api.service.ts';
import { toast } from 'sonner';
import React from 'react';

interface RestaurantListProps {
   restaurants: IRestaurant[];
   setRestaurants: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
   loading: boolean;
   onEdit: (restaurant: IRestaurant) => void;
}

export function RestaurantList({ restaurants, loading, onEdit, setRestaurants }: RestaurantListProps) {
   const [loadingDelete, setLoadingDelete] = React.useState(false);

   // Handle restaurant deletion
   const handleDelete = async (id: number) => {
      setLoadingDelete(true);
      try {
         const response = await deleteRestaurant(id);
         if (response.success) {
            setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
            toast.success('Restaurant deleted successfully');
         }
      } catch (err) {
         if (err instanceof Error) toast.error(err.message);
         else toast.error('Failed to delete restaurant. Please try again.');
         console.error('Error deleting restaurant:', err);
      } finally {
         setLoadingDelete(false);
      }
   };

   // Show skeleton loading state
   if (loading) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Render 3 skeleton cards to mimic loading */}
            {[...Array(6)].map((_, index) => (
               <div key={index} className="bg-card border-border">
                  <div className="p-4">
                     <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-1/2" /> {/* Title placeholder */}
                        <div className="flex gap-2">
                           <Skeleton className="h-8 w-8" /> {/* Edit button */}
                           <Skeleton className="h-8 w-8" /> {/* Delete button */}
                        </div>
                     </div>
                     <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                           <Skeleton className="h-4 w-4" /> {/* MapPin icon */}
                           <Skeleton className="h-4 w-3/4" /> {/* Address */}
                        </div>
                        <div className="flex items-center gap-2">
                           <Skeleton className="h-4 w-4" /> {/* Phone icon */}
                           <Skeleton className="h-4 w-1/3" /> {/* Contact */}
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
         <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No restaurants found</p>
            <p className="text-muted-foreground text-sm mt-2">Click "Add Restaurant" to create your first restaurant</p>
         </div>
      );
   }

   // Render restaurant cards
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {restaurants.map((restaurant) => (
            <RestaurantCard
               key={restaurant.id}
               restaurant={restaurant}
               onEdit={onEdit}
               onDelete={handleDelete}
               isLoadingDelete={loadingDelete}
            />
         ))}
      </div>
   );
}