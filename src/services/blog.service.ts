import { env } from "@/env";
import { BlogData } from "@/TYPES";
import { cookies } from "next/headers";

interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
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

      config.next = { ...config.next, tags: ["blogPosts"] };
      const res = await fetch(url.toString(), config);

      //* reference hishabe aita rakhci tags ta next er vitor onno objext diyaw rakha jay

      // const res = await fetch(url.toString(), {
      //   next: {
      //     tags: ["blogPosts"],
      //   },
      // });

      // url.searchParams.append("key", "value");

      //* SSR
      // const res = await fetch(`${API_URL}/posts`, {cache: "no-store"});
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "somthing went wrong" } };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "somthing went wrong" } };
    }
  },

  createBlogPost: async (blogData: BlogData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json()

      if(data.error){
        return {data: null, error: {message: "Post not created"}}
      }

      return {data: data, error: null}
    } catch (error) {
      return { data: null, error: { message: "somthing went wrong" } };
    }
  },
};
