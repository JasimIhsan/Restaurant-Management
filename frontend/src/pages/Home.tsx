import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';
import { Navbar } from '@/components/Navbar.tsx';
import { RestaurantList } from '@/components/RestaurantList.tsx';
import { RestaurantForm } from '@/components/RestaurantForm.tsx';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import { getRestaurants } from '@/api/restaurant.api.service.ts';
import { toast } from 'sonner';
import { PaginationControls } from '@/components/custom/PaginationControls.tsx';
import { Input } from '@/components/ui/input.tsx';
import { RefreshCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

// Define constants
const ITEMS_PER_PAGE = 6;
const DEBOUNCE_DELAY = 1000;

// Define interfaces for better type safety
interface FetchRestaurantsParams {
   page: number;
   searchValue: string;
}

export function Home() {
   // Manage URL query parameters
   const [searchParams, setSearchParams] = useSearchParams();

   // Initialize state from URL
   const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [showForm, setShowForm] = useState<boolean>(false);
   const [editingRestaurant, setEditingRestaurant] = useState<IRestaurant | null>(null);
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [search, setSearch] = useState<string>(searchParams.get('search') || '');
   const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '1'));
   const [totalCount, setTotalCount] = useState<number>(0);

   // Fetch restaurants with error handling
   const fetchRestaurants = useCallback(async ({ page, searchValue }: FetchRestaurantsParams) => {
      try {
         setLoading(true);
         const response = await getRestaurants(page, ITEMS_PER_PAGE, searchValue.trim());
         if (response.success) {
            setRestaurants(response.data.restaurants || []);
            setTotalCount(response.data.count || 0);
            setCurrentPage(page);
         }
      } catch (err) {
         toast.error('Failed to fetch restaurants. Please try again later.');
         console.error('Error fetching restaurants:', err);
         setRestaurants([]);
         setTotalCount(0);
      } finally {
         setLoading(false);
      }
   }, []);

   // Debounced search handler
   const debouncedSearch = useMemo(
      () =>
         debounce((value: string) => {
            fetchRestaurants({ page: 1, searchValue: value });
         }, DEBOUNCE_DELAY),
      [fetchRestaurants]
   );

   // Fetch restaurants on mount or when currentPage changes
   useEffect(() => {
      fetchRestaurants({ page: currentPage, searchValue: search });
   }, [currentPage, fetchRestaurants]);

   // Update URL when filters change
   useEffect(() => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (currentPage !== 1) params.set('page', currentPage.toString());
      setSearchParams(params, { replace: true });
   }, [search, currentPage, setSearchParams]);

   // Cleanup debounce on unmount
   useEffect(() => {
      return () => {
         debouncedSearch.cancel();
      };
   }, [debouncedSearch]);

   // Search input handler
   const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const value = e.target.value;
         setSearch(value);
         debouncedSearch(value);
      },
      [debouncedSearch]
   );

   // Reset search handler
   const handleResetSearch = useCallback(async () => {
      setSearch('');
      debouncedSearch(''); // Use debouncedSearch to reset
   }, [debouncedSearch]);

   // Form handlers
   const handleAddRestaurant = useCallback(() => {
      setEditingRestaurant(null);
      setIsEditing(false);
      setShowForm(true);
   }, []);

   const handleEditRestaurant = useCallback((restaurant: IRestaurant) => {
      setEditingRestaurant(restaurant);
      setIsEditing(true);
      setShowForm(true);
   }, []);

   const handleFormSave = useCallback(async () => {
      setShowForm(false);
      setIsEditing(false);
      setEditingRestaurant(null);
      await fetchRestaurants({ page: currentPage, searchValue: search });
   }, [currentPage, search, fetchRestaurants]);

   const handleFormCancel = useCallback(() => {
      setShowForm(false);
      setIsEditing(false);
      setEditingRestaurant(null);
   }, []);

   // Calculate total pages
   const totalPages = useMemo(() => Math.ceil(totalCount / ITEMS_PER_PAGE), [totalCount]);

   return (
      <div className="min-h-screen bg-background">
         <Navbar onAddRestaurant={handleAddRestaurant} />

         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 flex flex-col sm:flex-row justify-center sm:items-center gap-4">
               <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Restaurant Directory</h2>
                  <p className="text-muted-foreground">Manage your restaurant locations and contact information</p>
               </div>
               <div className="relative">
                  <label htmlFor="search" className="sr-only">
                     Search restaurants
                  </label>
               </div>
            </div>

            <div className="relative w-full mb-4">
               <div className="flex gap-2">
                  <Input id="search" type="text" value={search} onChange={handleSearchChange} placeholder="Search restaurants..." className="w-full pr-10 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Search restaurants" />
                  {search && (
                     <button onClick={handleResetSearch} className="absolute right-15 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">
                        <X className="h-5 w-5" />
                     </button>
                  )}
                  <Button onClick={() => fetchRestaurants({ page: currentPage, searchValue: search })}>
                     <RefreshCcw className="h-5 w-5" />
                  </Button>
               </div>
            </div>
            {loading && (
               <div className="text-center py-4">
                  <p className="text-muted-foreground">Loading restaurants...</p>
               </div>
            )}
            {!loading && restaurants.length === 0 && (
               <div className="text-center py-4">
                  <p className="text-muted-foreground">No restaurants found.</p>
               </div>
            )}
            <RestaurantList onEdit={handleEditRestaurant} restaurants={restaurants} loading={loading} setRestaurants={setRestaurants} />
            {totalPages > 1 && <PaginationControls className="mt-8" currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => fetchRestaurants({ page, searchValue: search })} />}
         </main>

         {showForm && <RestaurantForm isEditing={isEditing} restaurant={editingRestaurant} setRestaurants={setRestaurants} onSave={handleFormSave} onCancel={handleFormCancel} />}
      </div>
   );
}
