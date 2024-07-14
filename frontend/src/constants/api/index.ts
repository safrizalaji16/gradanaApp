const baseAPI = process.env.baseUrlAPI;

const api = {
  authPath(endpoint?: string, param?: string) {
    return `${baseAPI}/auth${
      endpoint && param
        ? `/${endpoint}?${param}`
        : endpoint
        ? `/${endpoint}`
        : param
        ? `?${param}`
        : ""
    }`;
  },

  userPath(endpoint?: string, param?: string) {
    return `${baseAPI}/users${
      endpoint && param
        ? `/${endpoint}?${param}`
        : endpoint
        ? `/${endpoint}`
        : param
        ? `?${param}`
        : ""
    }`;
  },
  
  saldoHistoryPath(endpoint?: string, param?: string) {
    return `${baseAPI}/histories${
      endpoint && param
        ? `/${endpoint}?${param}`
        : endpoint
        ? `/${endpoint}`
        : param
        ? `?${param}`
        : ""
    }`;
  },
};

export default api;
