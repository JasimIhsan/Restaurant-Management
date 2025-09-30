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

export async function getRestaurants(page = 1, limit = 6, search = '') {
   try {
      const res = await axiosInstance.get(`/restaurants`, {
         params: { page, limit, search },
      });
      return res.data;
   } catch (err) {
      return { success: false, data: [], count: 0 };
   }
}

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
