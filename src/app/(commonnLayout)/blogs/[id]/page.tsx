import Image from "next/image";
import { Calendar, Eye, MessageSquare, Tag, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogService } from "@/services/blog.service";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetching the single blog post data
  const response = await blogService.getBlogById(id);
  const post = response?.data;

  // Handle case where post is not found
  if (!post) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">Post Not Found</h1>
        <p className="text-zinc-500 mb-4">The blog post you are looking for does not exist or has been removed.</p>
        <Link 
          href="/blogs" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Back to Blogs
        </Link>
      </main>
    );
  }

  // Format the creation date nicely
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        
        {/* Back Button / Navigation */}
        <div className="p-6 pb-0">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to posts
          </Link>
        </div>

        {/* Thumbnail / Hero Section */}
        <div className="relative w-full h-64 sm:h-80 mt-6 bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-y border-zinc-100 dark:border-zinc-800">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-6 text-center">
              <span className="text-4xl mb-2">📖</span>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {post.title}
              </span>
            </div>
          )}

          {post.isFeatured && (
            <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
        </div>

        {/* Main Card Content */}
        <div className="p-6 sm:p-8">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </div>

            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-500" />
              <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-xs">
                {post.authorId.slice(0, 10)}...
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-500" />
              <span>{post.views} views</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              <span>{post._count?.comments ?? post.comments?.length ?? 0} comments</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <Tag className="w-4 h-4 text-zinc-400 mr-1" />
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-900/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content Body */}
          <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
            {post.content}
          </div>

        </div>
      </article>
    </main>
  );
}