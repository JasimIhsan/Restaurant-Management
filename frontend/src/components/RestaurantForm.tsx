import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { IRestaurant } from '@/types/dto/restaurant.dto.ts';
import { addRestaurant, updateRestaurant } from '@/api/restaurant.api.service.ts';

// Zod schema
const restaurantSchema = z.object({
   name: z.string().trim().min(2, 'Restaurant name must be at least 2 characters').max(100, 'Restaurant name cannot exceed 100 characters'),
   address: z.string().trim().min(5, 'Address must be at least 5 characters').max(200, 'Address cannot exceed 200 characters'),
   contact: z
      .string()
      .trim()
      .regex(/^(\+?\d{1,3})?\d{10}$/, 'Contact must be exactly 10 digits, optionally with country code (e.g., +911234567890 or 1234567890)'),
});
type FormData = z.infer<typeof restaurantSchema>;

interface RestaurantFormProps {
   isEditing: boolean;
   restaurant?: IRestaurant | null;
   setRestaurants: (restaurants: IRestaurant[] | ((prev: IRestaurant[]) => IRestaurant[])) => void;
   onSave: () => void;
   onCancel: () => void;
}

export function RestaurantForm({ isEditing, restaurant, setRestaurants, onSave, onCancel }: RestaurantFormProps) {
   const [formData, setFormData] = useState<FormData>({ name: '', address: '', contact: '' });
   const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
   const [loading, setLoading] = useState(false);

   // Populate form when editing
   useEffect(() => {
      if (isEditing && restaurant) {
         setFormData({ name: restaurant.name, address: restaurant.address, contact: restaurant.contact });
      } else {
         setFormData({ name: '', address: '', contact: '' });
      }
      setErrors({});
   }, [isEditing, restaurant]);

   // Handle input changes
   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Real-time single-field validation
      const fieldSchema = restaurantSchema.shape[name as keyof FormData];
      const result = fieldSchema.safeParse(value);
      setErrors((prev) => ({
         ...prev,
         [name]: result.success ? undefined : result.error.issues[0]?.message,
      }));
   }, []);

   // Check form validity
   const isFormValid = () => restaurantSchema.safeParse(formData).success;

   // Unified submit handler
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedData = {
         name: formData.name.trim(),
         address: formData.address.trim(),
         contact: formData.contact.trim(),
      };

      const result = restaurantSchema.safeParse(trimmedData);
      if (!result.success) {
         const fieldErrors: Partial<Record<keyof FormData, string>> = {};
         result.error.issues.forEach((issue) => {
            if (issue.path[0]) fieldErrors[issue.path[0] as keyof FormData] = issue.message;
         });
         setErrors(fieldErrors);
         toast.error('Please fix the form errors');
         return;
      }

      setLoading(true);
      try {
         const response = isEditing && restaurant?.id ? await updateRestaurant(restaurant.id, trimmedData) : await addRestaurant(trimmedData);

         if (response.success) {
            setRestaurants((prev) => (isEditing ? prev.map((r) => (r.id === restaurant?.id ? { ...r, ...trimmedData } : r)) : [...prev, response.data]));
            toast.success(`Restaurant ${isEditing ? 'updated' : 'created'} successfully`);
            onSave();
         } else {
            toast.error(`Failed to ${isEditing ? 'update' : 'create'} restaurant`);
         }
      } catch (error) {
         console.error(error);
         if (error instanceof Error) toast.error(error.message);
         else toast.error('Something went wrong. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   const handleCancel = () => {
      setFormData({ name: '', address: '', contact: '' });
      setErrors({});
      onCancel();
   };

   return (
      <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center p-4 z-50">
         <Card className="w-full max-w-md bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
               <CardTitle className="text-xl text-foreground">{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</CardTitle>
               <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
               </Button>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  {(['name', 'address', 'contact'] as (keyof FormData)[]).map((field) => (
                     <div key={field} className="space-y-2">
                        <Label htmlFor={field} className="text-foreground capitalize">
                           {field}
                        </Label>
                        <Input id={field} name={field} type="text" value={formData[field]} onChange={handleChange} placeholder={`Enter ${field}`} className={`bg-input border-border text-foreground ${errors[field] ? 'border-destructive' : ''}`} required />
                        {errors[field] && <p className="text-sm text-destructive">{errors[field]}</p>}
                     </div>
                  ))}

                  <div className="flex gap-3 pt-4">
                     <Button type="submit" disabled={loading || !isFormValid()} className="flex-1 flex items-center gap-2">
                        <Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Save Restaurant'}
                     </Button>
                     <Button type="button" variant="outline" onClick={handleCancel} disabled={loading} className="flex-1 bg-transparent">
                        Cancel
                     </Button>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}
