import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Cookies from 'js-cookie';

const url = process.env.REACT_APP_API_URL

// базовый запрос
export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers, api) => {
    const access_token = Cookies.get('access_token');

    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
      if(api.endpoint !== 'uploadDuties') {
        headers.set('Content-Type', 'application/json');
      }
    }

    return headers;
  },
});

// обработка базового запроса, если ошибка, то переходим на /login
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401 && api.endpoint !== "login") {
      Cookies.remove('access_token');
      window.open('/login')
    }
  }
  return result;
};