import { RestaurantCard } from './RestaurantCard';
import { Loader2 } from 'lucide-react';
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
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onEdit={onEdit} onDelete={handleDelete} isLoadingDelete={loadingDelete} />
         ))}
      </div>
   );
}
