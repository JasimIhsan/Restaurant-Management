import type { Restaurant } from '../api/restaurant.api.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, MapPin, Phone } from 'lucide-react';
import { Alert } from '@/components/custom/Alert.tsx';

interface RestaurantCardProps {
   restaurant: Restaurant;
   onEdit: (restaurant: Restaurant) => void;
   onDelete: (id: number) => void;
}

export default function RestaurantCard({ restaurant, onEdit, onDelete }: RestaurantCardProps) {
   const handleDelete = () => {
      onDelete(restaurant.id!);
   };

   return (
      <Card className="bg-card border-border hover:bg-accent/50 transition-colors">
         <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center justify-between">
               {restaurant.name}
               <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(restaurant)} className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                     <Edit className="h-4 w-4" />
                  </Button>

                  <Alert
                     triggerElement={
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                           <Trash2 className="h-4 w-4" />
                        </Button>
                     }
                     contentTitle="Delete Restaurant"
                     contentDescription="Are you sure you want to delete this restaurant?"
                     actionText="Delete"
                     onConfirm={handleDelete}
                  />
               </div>
            </CardTitle>
         </CardHeader>
         <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <MapPin className="h-4 w-4" />
               <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Phone className="h-4 w-4" />
               <span>{restaurant.contact}</span>
            </div>
         </CardContent>
      </Card>
   );
}
