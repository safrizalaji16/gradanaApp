import type { AxiosError, AxiosResponse } from "axios";
import type { QueryListResponse } from "../../types/axios/Response";
import axios from "axios";
import api from "@/constants/api";
import { SaldoHistory } from "../../types/entities/saldoHistory";

interface TransactionParams {
  id: string;
  amount: number;
  type: string;
}

export const saldoHistoriyService = {
  updateSaldo: async (param: TransactionParams, token: string) => {
    try {
      return (await axios.post(api.saldoHistoryPath(param.id), param, {
        headers: {
          Authorization: token,
        },
      })) as AxiosResponse<QueryListResponse<SaldoHistory>, {}>;
    } catch (e) {
      console.log((e.response.data.error as AxiosError).request);
      throw e.response.data;
    }
  },
};
