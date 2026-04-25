export type UserRole =
  | "resident"
  | "colony_admin"
  | "supervisor"
  | "worker"
  | "vendor"
  | "local_authority"
  | "super_admin";

export interface Colony {
  id: string;
  name: string;
  city: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  colonies: Colony[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type GrievanceStatus = "open" | "in_progress" | "resolved" | "closed";

export interface FeedPost {
  id: string;
  authorName: string;
  authorRole: UserRole;
  text: string;
  mediaUrls: string[];
  mediaType?: "image" | "video";
  likes: number;
  comments: number;
  reactions: Record<string, number>;
  poll?: {
    question: string;
    options: { id: string; label: string; votes: number }[];
  };
  isServiceRequest?: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  type: "text" | "image";
  content: string;
  createdAt: string;
  readBy: string[];
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  status: GrievanceStatus;
  slaDeadline: string;
  assignedTo?: string;
  updatedAt: string;
}
