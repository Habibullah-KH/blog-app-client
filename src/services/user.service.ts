import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      // const session = await authClient.getSession();
      // console.log(session);
      const cookieStore = await cookies();
      // console.log(cookieStore.toString());

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session.data === null) {
        return { data: null, error: { message: "session is missing" } };
      }

      return { data: session, error: null };
    } catch (er) {
      return { data: null, error: er };
    }
  },
};
