export type QueryListResponse<T> = {
  data: T;
  authentication: {
    sessionToken: string;
  };
};
