import { useQuery, useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../endpoints";
import axiosInstance from "../axiosInstance";

//  get all banks
const useAllBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.ALL_BANKS);
      return response.data?.data?.responseBody || [];
    },
  });
};

// transfer to banks
const useTransfer = () => {
  return useMutation({
    mutationFn: async (transferData: {
      accountNumber: string;
      bankCode: string;
      amount: number;
    }) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.TRANSFER,
        transferData
      );
      return response.data;
    },
  });
};

export { useAllBanks, useTransfer };
