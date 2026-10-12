import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/TYPES";

export default async function Home() {
  const { data } = await blogService.getBlogPost(
    {
      isFeatured: true,
    },
    {
      cache: "no-store",
    },
  );

  // console.log(data);
  return (
    <div className="grid grid-cols-5 gap-2 mx-auto mx-w-7xl px-20">
      {data?.data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
