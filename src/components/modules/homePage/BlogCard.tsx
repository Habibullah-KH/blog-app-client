import { Button } from "@/components/ui/button";
import { BlogPost } from "@/TYPES";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, ArrowRight } from "lucide-react";

export default function BlogCard({ post }: { post?: BlogPost | null }) {
  if (!post) return null;

  const title = post.title ?? "Untitled post";
  const content = post.content ?? "";
  
  // Format creation date nicely
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
      
      {/* Thumbnail or Fallback Header */}
      <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-4 text-center">
            <span className="text-2xl mb-1">📝</span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 line-clamp-1">
              {title}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {post.isFeatured && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-grow p-5">
        
        {/* Meta Info (Date & Views) */}
        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-3">
          {formattedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{formattedDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-indigo-500" />
            <span>{post.views ?? 0} views</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
            <span>{post._count?.comments ?? 0}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        {/* Snippet Content */}
        <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2 flex-grow">
          {content}
        </p>

        {/* Tags */}
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        ) : null}

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
          <span className="text-xs font-medium text-slate-400">
            By {post.authorId?.slice(0, 6)}...
          </span>
          <Button 
            variant="ghost"
            size="sm"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 group/btn"
          >
            <Link href={`/blogs/${post.id}`} className="flex items-center gap-1">
              Read More 
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}