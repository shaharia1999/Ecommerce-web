import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderData } from './type';
import { orderAPI } from './orderAPI';
import { QUERY_KEYS } from './queryKeys';
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: OrderData) => orderAPI.createOrder(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] }),
  });
};

export const useOrder = (id: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, id],
    queryFn: () => orderAPI.getOrderById(id),
    enabled: enabled && !!id,
  });
};


