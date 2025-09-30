import { axiosInstance } from '@/api/api.config.ts';
import { throwApiError } from '@/utils/throw.api.error.ts';

export const addRestaurant = async (restaurant: { name: string; address: string; contact: string }) => {
   try {
      const response = await axiosInstance.post('/restaurants', restaurant);
      return response.data;
   } catch (error) {
      throwApiError(error);
   }
};

export const getRestaurants = async () => {
   try {
      const response = await axiosInstance.get('/restaurants');
      return response.data;
   } catch (error) {
      throwApiError(error);
   }
};

export const updateRestaurant = async (id: number, restaurant: { name: string; address: string; contact: string }) => {
   try {
      const response = await axiosInstance.put(`/restaurants/${id}`, restaurant);
      return response.data;
   } catch (error) {
      throwApiError(error);
   }
};

export const deleteRestaurant = async (id: number) => {
   try {
      const response = await axiosInstance.delete(`/restaurants/${id}`);
      return response.data;
   } catch (error) {
      throwApiError(error);
   }
};
