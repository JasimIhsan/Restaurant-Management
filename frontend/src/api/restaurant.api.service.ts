// Mock API service for demo purposes - simulates backend with localStorage
export interface Restaurant {
   id?: number;
   name: string;
   address: string;
   contact: string;
}

// Mock data for initial load
const mockRestaurants: Restaurant[] = [
   {
      id: 1,
      name: 'Bella Vista Italian',
      address: '123 Main Street, Downtown',
      contact: '(555) 123-4567',
   },
   {
      id: 2,
      name: 'Dragon Palace Chinese',
      address: '456 Oak Avenue, Midtown',
      contact: '(555) 987-6543',
   },
   {
      id: 3,
      name: 'Café Parisien',
      address: '789 Elm Street, Arts District',
      contact: '(555) 456-7890',
   },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Get data from localStorage or use mock data
const getStoredRestaurants = (): Restaurant[] => {
   if (typeof window === 'undefined') return mockRestaurants;

   const stored = localStorage.getItem('restaurants');
   if (stored) {
      return JSON.parse(stored);
   }

   // Initialize with mock data
   localStorage.setItem('restaurants', JSON.stringify(mockRestaurants));
   return mockRestaurants;
};

// Save data to localStorage
const saveRestaurants = (restaurants: Restaurant[]): void => {
   if (typeof window !== 'undefined') {
      localStorage.setItem('restaurants', JSON.stringify(restaurants));
   }
};

// Generate next ID
const getNextId = (restaurants: Restaurant[]): number => {
   return Math.max(...restaurants.map((r) => r.id || 0), 0) + 1;
};

export const restaurantService = {
   // Get all restaurants
   getRestaurants: async (): Promise<Restaurant[]> => {
      await delay(500); // Simulate network delay
      return getStoredRestaurants();
   },

   // Get restaurant by ID
   getRestaurant: async (id: number): Promise<Restaurant> => {
      await delay(300);
      const restaurants = getStoredRestaurants();
      const restaurant = restaurants.find((r) => r.id === id);
      if (!restaurant) {
         throw new Error('Restaurant not found');
      }
      return restaurant;
   },

   // Create new restaurant
   createRestaurant: async (restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
      await delay(400);
      const restaurants = getStoredRestaurants();
      const newRestaurant = {
         ...restaurant,
         id: getNextId(restaurants),
      };
      const updatedRestaurants = [...restaurants, newRestaurant];
      saveRestaurants(updatedRestaurants);
      return newRestaurant;
   },

   // Update restaurant
   updateRestaurant: async (id: number, restaurant: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
      await delay(400);
      const restaurants = getStoredRestaurants();
      const index = restaurants.findIndex((r) => r.id === id);
      if (index === -1) {
         throw new Error('Restaurant not found');
      }

      const updatedRestaurant = { ...restaurant, id };
      restaurants[index] = updatedRestaurant;
      saveRestaurants(restaurants);
      return updatedRestaurant;
   },

   // Delete restaurant
   deleteRestaurant: async (id: number): Promise<void> => {
      await delay(300);
      const restaurants = getStoredRestaurants();
      const filteredRestaurants = restaurants.filter((r) => r.id !== id);
      if (filteredRestaurants.length === restaurants.length) {
         throw new Error('Restaurant not found');
      }
      saveRestaurants(filteredRestaurants);
   },
};
