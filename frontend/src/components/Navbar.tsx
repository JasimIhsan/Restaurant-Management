'use client';
import { Button } from '@/components/ui/button';
import { Plus, Hamburger } from 'lucide-react';

interface NavbarProps {
   onAddRestaurant: () => void;
}

export function Navbar({ onAddRestaurant }: NavbarProps) {
   return (
      <nav className="bg-card border-b border-border">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               <div className="flex items-center gap-3">
                  <Hamburger className="h-8 w-8 text-primary" />
                  <h1 className="text-xl font-semibold text-foreground">Restaurant Management</h1>
               </div>

               <Button onClick={onAddRestaurant} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Restaurant
               </Button>
            </div>
         </div>
      </nav>
   );
}
