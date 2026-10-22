import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/TYPES";
import Image from "next/image";
import rtxSpark from "../../../public/rtxSpark.jpg";

export default async function Home() {
  const { data } = await blogService
    .getBlogPost
    // {
    //   isFeatured: false,
    // },
    // {
    //   cache: "no-store",
    // },
    ();
  const featuredPostsPromise = await blogService.getBlogPost({
    isFeatured: true,
  });
  const postsPromise = await blogService.getBlogPost(
    {
      limit: 3,
    },
    // { revalidate: 10 },
  );

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);

  // console.time("Sequential");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.timeEnd("Sequential");

  // console.time("Paralal");
  // const promise1 = new Promise((resolve) => setTimeout(resolve, 3000));
  // const promise2 = new Promise((resolve) => setTimeout(resolve, 3000));
  // console.timeEnd("Paralal");

  // await Promise.all([promise1, promise2])

  return (
    <div>
      <div className="mx-auto m-4 relative w-full h-96 mb-6">
        <Image
          src={rtxSpark}
          alt="hero"
          fill
          className="rounded-2xl object-cover"
        />
        {/* <Image
          src={rtxSpark}
          alt="hero"
          fill
          className="rounded-2xl object-cover"
        /> */}
      </div>

      <div className="grid md:grid-cols-4 gap-3 gap-y-5 mx-auto mx-w-7xl px-20">
        {data?.data?.data?.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
