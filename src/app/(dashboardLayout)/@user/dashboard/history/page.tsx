import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams; //* next.js pattern to use await
  console.log(page);

  const response = await blogService.getBlogPost({page});

  console.log(response);

  const posts = response.data?.data?.data || [];

  return (
    <div className="p-6">
      <h1 className="texxt-2xl font-bold mb-6">Blog Post History</h1>
      <HistoryTable posts={posts} />
    </div>
  );
}
