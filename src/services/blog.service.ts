import { env } from "@/env";

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const API_URL = env.API_URL;

export const blogService = {
  getBlogPost: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);
      // console.log(Object.entries(params));

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value != undefined && value != null && value != "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      // url.searchParams.append("key", "value");
      console.log(url.toString());

      const res = await fetch(url.toString(), config);

      //* SSR
      // const res = await fetch(`${API_URL}/posts`, {cache: "no-store"});
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "somthing went wrong" } };
    }
  },

  getBlogById: async function (id: string) {
    try{
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return {data: data, error: null};
    }
    catch(err){
      return {data: null, error: {message: "somthing went wrong"}};
    }
  }
};
