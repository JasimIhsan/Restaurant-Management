import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, MapPin, Phone, Loader2 } from 'lucide-react';
import { Alert } from '@/components/custom/Alert.tsx';
import { deleteRestaurant } from '@/api/restaurant.api.service.ts';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import { toast } from 'sonner';
import React from 'react';

interface RestaurantCardProps {
   restaurant: IRestaurant;
   onEdit: (restaurant: IRestaurant) => void;
   setRestaurants: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
}

export const RestaurantCard = React.memo(({ restaurant, onEdit, setRestaurants }: RestaurantCardProps) => {
   const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

   // Handle restaurant deletion
   const handleDelete = async () => {
      setIsLoadingDelete(true);
      try {
         const response = await deleteRestaurant(restaurant.id);
         if (response.success) {
            setRestaurants((prev) => prev.filter((r) => r.id !== restaurant.id));
            toast.success(`${restaurant.name} deleted successfully`);
         }
      } catch (err) {
         toast.error(err instanceof Error ? err.message : 'Failed to delete restaurant. Please try again.');
         console.error('Error deleting restaurant:', err);
      } finally {
         setIsLoadingDelete(false);
      }
   };

   return (
      <Card className="bg-card border border-border hover:bg-accent/50 transition-colors" role="listitem" aria-label={`Restaurant ${restaurant.name}`}>
         <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center justify-between">
               <span>{restaurant.name}</span>
               <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(restaurant)} className="h-8 w-8 p-0 text-muted-foreground hover:text-primary" aria-label={`Edit ${restaurant.name}`}>
                     <Edit className="h-4 w-4" />
                  </Button>
                  <Alert
                     triggerElement={
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" disabled={isLoadingDelete} aria-label={`Delete ${restaurant.name}`}>
                           {isLoadingDelete ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                     }
                     contentTitle={`Delete ${restaurant.name}`}
                     contentDescription={`Are you sure you want to delete ${restaurant.name}? This action cannot be undone.`}
                     actionText="Delete"
                     onConfirm={handleDelete}
                  />
               </div>
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <MapPin className="h-4 w-4" aria-hidden="true" />
               <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Phone className="h-4 w-4" aria-hidden="true" />
               <span>{restaurant.contact}</span>
            </div>
         </CardContent>
      </Card>
   );
});
