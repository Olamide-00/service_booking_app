import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../endpoints";
import axiosInstance from "../axiosInstance";

type VerifyPayload = {
  serviceID: string;
  billersCode: string;
};

type VerifyResponse = any;

const useVerify = () => {
  const queryClient = useQueryClient(); // Get the QueryClient instance

  return useMutation<VerifyResponse, Error, VerifyPayload>({
    mutationFn: async (payload: VerifyPayload) => {
      const response = await axiosInstance.post<VerifyResponse>(
        API_ENDPOINTS.VERIFY,
        payload
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Refetch related queries after a successful verification
      queryClient.invalidateQueries({
        queryKey: ["verification", variables.serviceID, variables.billersCode],
      });
    },
  });
};

export default useVerify;
