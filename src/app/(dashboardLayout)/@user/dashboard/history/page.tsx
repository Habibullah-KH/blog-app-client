import HistoryTable from "@/components/modules/user/history/HistoryTable";
import PaginationControls from "@/components/ui/paginationControls";
import { blogService } from "@/services/blog.service";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams; //* next.js pattern to use await

  const response = await blogService.getBlogPost({ page });

  const posts = response.data?.data?.data || [];
  const pagination = response.data?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPage: 1,
  };

  return (
    <div className="p-6">
      <h1 className="texxt-2xl font-bold mb-6">Blog Post History</h1>
      <HistoryTable posts={posts} />
      <PaginationControls meta={pagination} />
    </div>
  );
}
