export interface BlogPost {
  id?: string | number;
  title?: string;
  content?: string;
  thumbnail?: string | null;
  createdAt?: string;
  authorId?: string;
  tags?: string[];
  views?: number;
  comments?: unknown[];
  _count?: {
    comments?: number;
  };
  isFeatured?: boolean;
}
