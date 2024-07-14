import type { AxiosError, AxiosResponse } from "axios";
import type { QueryListResponse } from "../../types/axios/Response";
import axios from "axios";
import api from "@/constants/api";
import { User } from "../../types/entities/user";

export const userService = {
  getUserLoggedIn: async (token: string) => {
    try {
      return (await axios.get(api.userPath("logged-in"), {
        headers: {
          Authorization: token,
        },
      })) as AxiosResponse<QueryListResponse<User>, {}>;
    } catch (e) {
      console.log((e as AxiosError).request);
      throw null;
    }
  },
};
