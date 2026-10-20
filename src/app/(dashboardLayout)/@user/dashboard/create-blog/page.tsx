import CreateBlogFormClient from "@/components/modules/user/createBlog/createBlogFormClient";
import CreateBlogFormServer from "@/components/modules/user/createBlog/createBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/TYPES";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPost({}, {cache: "no-store"});

  return (
    <div>
      {/* <CreateBlogFormServer /> */}
      <CreateBlogFormClient />
      {data?.data?.data?.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
