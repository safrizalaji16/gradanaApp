import type { AxiosError, AxiosResponse } from "axios";
import type { QueryListResponse } from "../../types/axios/Response";
import axios from "axios";
import api from "@/constants/api";
import { User } from "../../types/entities/user";

export const authService = {
  login: async (param: Record<string, unknown>) => {
    try {
      return (await axios.post(api.authPath("login"), {
        ...param,
      })) as AxiosResponse<QueryListResponse<User>, {}>;
    } catch (e) {
      console.log((e as AxiosError).request);
      throw null;
    }
  },

  register: async (param: Record<string, unknown>) => {
    try {
      return (await axios.post(api.authPath("register"), {
        ...param,
      })) as AxiosResponse<QueryListResponse<User>, {}>;
    } catch (e) {
      console.log((e as AxiosError).request);
      throw null;
    }
  },
};
