"use client"

import { getBlogs } from "@/actoins/blog.action";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export default function AboutPage() {
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const [data, setData] = useState();
  const [error, setError] = useState<{message: string} | null>(null);

  console.log(error)
  console.log(data)
  useEffect(()=>{
    (async () => {
      const {data, error} = await getBlogs();

      setData(data);
      setError(error);
    })();

  }, [])


  return (
    <div>
      <h1>this s about page</h1>
    </div>
  );
}
