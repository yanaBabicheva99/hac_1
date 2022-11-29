import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createToken, removeToken } from "../services/tokenService";

const baseUrl = `https://server-hack.onrender.com/api/`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).token.tokenValue;
    if (token && endpoint !== "refresh") {
      headers.set("authorization", `Bearer ${token}`);
      // headers.set('content-type', 'text/plain');
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        credentials: "include",
        url: "refresh",
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(createToken(refreshResult.data as any));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(removeToken())
    }
  }
  return result;
};

export default customFetchBase;
