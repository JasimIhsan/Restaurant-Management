import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import { getRestaurants } from '@/api/restaurant.api.service.ts';

interface RestaurantListProps {
   onEdit: (restaurant: IRestaurant) => void;
   refreshTrigger: number;
}

export function RestaurantList({ onEdit, refreshTrigger }: RestaurantListProps) {
   const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchRestaurants = async () => {
      try {
         setLoading(true);
         const data = await getRestaurants();
         setRestaurants(data);
      } catch (err) {
         toast.error('Failed to fetch restaurants. Please try again.');
         console.error('Error fetching restaurants:', err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchRestaurants();
   }, [refreshTrigger]);

   const handleDelete = async (id: number) => {
      try {
         console.log(id);

         // await restaurantService.deleteRestaurant(id);
         // setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      } catch (err) {
         console.error('Error deleting restaurant:', err);
      }
   };

   // const handleRetry = () => {
   //    fetchRestaurants();
   // };

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
