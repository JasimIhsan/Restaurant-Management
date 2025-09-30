import { useState } from 'react';
import type { Restaurant } from '@/api/restaurant.api.service.ts';
import Navbar from '@/components/Navbar.tsx';
import { RestaurantList } from '@/components/ResturantList.tsx';
import RestaurantForm from '@/components/RestaurantForm.tsx';

export function Home() {
   const [showForm, setShowForm] = useState(false);
   const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
   const [refreshTrigger, setRefreshTrigger] = useState(0);

   const handleAddRestaurant = () => {
      setEditingRestaurant(null);
      setShowForm(true);
   };

   const handleEditRestaurant = (restaurant: Restaurant) => {
      setEditingRestaurant(restaurant);
      setShowForm(true);
   };

   const handleFormSave = () => {
      setShowForm(false);
      setEditingRestaurant(null);
      setRefreshTrigger((prev) => prev + 1);
   };

   const handleFormCancel = () => {
      setShowForm(false);
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

            <RestaurantList onEdit={handleEditRestaurant} refreshTrigger={refreshTrigger} />
         </main>

         {showForm && <RestaurantForm restaurant={editingRestaurant} onSave={handleFormSave} onCancel={handleFormCancel} />}
      </div>
   );
}
