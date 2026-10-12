import { BlogPost } from "@/TYPES";

export default function BlogCard({ post }: { post?: BlogPost | null }) {
  if (!post) return null;

  const title = post.title ?? "Untitled post";
  const content = post.content ?? "";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {content}
      </p>

      {post.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
