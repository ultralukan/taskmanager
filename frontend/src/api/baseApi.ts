import {createApi} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../axiosConfig";

// базовый api
export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['TASK'],
  endpoints: () => ({}),
});