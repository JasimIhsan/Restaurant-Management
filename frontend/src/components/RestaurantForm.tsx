import type React from 'react';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { type Restaurant, restaurantService } from '../api/restaurant.api.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save } from 'lucide-react';
import { toast } from 'sonner';

// Define Zod schema for form validation
const restaurantSchema = z.object({
   name: z.string().min(2, 'Restaurant name must be at least 2 characters').max(100, 'Restaurant name must be less than 100 characters'),
   address: z.string().min(5, 'Address must be at least 5 characters').max(200, 'Address must be less than 200 characters'),
   contact: z.string().regex(/^\+?\d{7,15}$/, 'Contact must be a valid phone number (7-15 digits, optional + prefix)'),
});

interface RestaurantFormProps {
   restaurant?: Restaurant | null;
   onSave: () => void;
   onCancel: () => void;
}

export default function RestaurantForm({ restaurant, onSave, onCancel }: RestaurantFormProps) {
   const [formData, setFormData] = useState({
      name: '',
      address: '',
      contact: '',
   });
   const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (restaurant) {
         setFormData({
            name: restaurant.name,
            address: restaurant.address,
            contact: restaurant.contact,
         });
         setErrors({}); // Clear errors when restaurant data changes
      } else {
         setFormData({
            name: '',
            address: '',
            contact: '',
         });
         setErrors({});
      }
   }, [restaurant]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form data with Zod
      const result = restaurantSchema.safeParse(formData);

      if (!result.success) {
         const fieldErrors: Partial<Record<keyof typeof formData, string>> = {};
         result.error.issues.forEach((issue) => {
            if (issue.path[0]) {
               fieldErrors[issue.path[0] as keyof typeof formData] = issue.message;
            }
         });
         setErrors(fieldErrors);
         toast.error('Please fix the form errors');
         return;
      }

      try {
         setLoading(true);
         setErrors({}); // Clear errors on successful validation

         if (restaurant?.id) {
            await restaurantService.updateRestaurant(restaurant.id, formData);
            toast.success('Restaurant updated successfully');
         } else {
            await restaurantService.createRestaurant(formData);
            toast.success('Restaurant created successfully');
         }

         onSave();
      } catch (err) {
         console.error('Error saving restaurant:', err);
         toast.error('Failed to save restaurant');
      } finally {
         setLoading(false);
      }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // Validate field on change to provide immediate feedback
      const fieldSchema = restaurantSchema.shape[name as keyof typeof formData];
      const result = fieldSchema.safeParse(value);
      setErrors((prev) => ({
         ...prev,
         [name]: result.success ? undefined : result.error.issues[0]?.message,
      }));
   };

   return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <Card className="w-full max-w-md bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
               <CardTitle className="text-xl text-foreground">{restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</CardTitle>
               <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
               </Button>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                     <Label htmlFor="name" className="text-foreground">
                        Restaurant Name
                     </Label>
                     <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter restaurant name" className={`bg-input border-border text-foreground ${errors.name ? 'border-destructive' : ''}`} required />
                     {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="address" className="text-foreground">
                        Address
                     </Label>
                     <Input id="address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Enter restaurant address" className={`bg-input border-border text-foreground ${errors.address ? 'border-destructive' : ''}`} required />
                     {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="contact" className="text-foreground">
                        Contact
                     </Label>
                     <Input id="contact" name="contact" type="text" value={formData.contact} onChange={handleChange} placeholder="Enter contact information (e.g., +1234567890)" className={`bg-input border-border text-foreground ${errors.contact ? 'border-destructive' : ''}`} required />
                     {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
                  </div>

                  <div className="flex gap-3 pt-4">
                     <Button type="submit" disabled={loading} className="flex-1 flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        {loading ? 'Saving...' : 'Save Restaurant'}
                     </Button>
                     <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="flex-1 bg-transparent">
                        Cancel
                     </Button>
                  </div>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}
