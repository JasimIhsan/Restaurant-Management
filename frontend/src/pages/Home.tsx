import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar.tsx';
import { RestaurantList } from '@/components/RestaurantList.tsx';
import { RestaurantForm } from '@/components/RestaurantForm.tsx';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import { getRestaurants } from '@/api/restaurant.api.service.ts';
import { toast } from 'sonner';

export function Home() {
   const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
   const [loading, setLoading] = useState(true);
   const [showForm, setShowForm] = useState(false);
   const [editingRestaurant, setEditingRestaurant] = useState<IRestaurant | null>(null);
   const [isEditing, setIsEditing] = useState(false);

   // Fetch restaurants on mount
   const fetchRestaurants = async () => {
      try {
         setLoading(true);
         const response = await getRestaurants();
         if (response.success) {
            console.log('Restaurants: ', response);
            setRestaurants(response.data);
         }
      } catch (err) {
         toast.error('Failed to fetch restaurants. Please try again.');
         console.error('Error fetching restaurants:', err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchRestaurants();
   }, []);

   const handleAddRestaurant = () => {
      setEditingRestaurant(null);
      setShowForm(true);
   };

   const handleEditRestaurant = (restaurant: IRestaurant) => {
      setEditingRestaurant(restaurant);
      setIsEditing(true);
      setShowForm(true);
   };

   const handleFormSave = () => {
      setShowForm(false);
      setIsEditing(false);
      setEditingRestaurant(null);
   };

   const handleFormCancel = () => {
      setShowForm(false);
      setIsEditing(false);
      setEditingRestaurant(null);
   };

   return (
      <div className="min-h-screen bg-background">
         <Navbar onAddRestaurant={handleAddRestaurant} />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
               <h2 className="text-2xl font-bold text-foreground mb-2">Restaurant Directory</h2>
               <p className="text-muted-foreground">Manage your restaurant locations and contact information</p>
            </div>

            <RestaurantList onEdit={handleEditRestaurant} restaurants={restaurants} loading={loading} />
         </main>

         {showForm && <RestaurantForm isEditing={isEditing} restaurant={editingRestaurant} setRestaurants={setRestaurants} onSave={handleFormSave} onCancel={handleFormCancel} />}
      </div>
   );
}
