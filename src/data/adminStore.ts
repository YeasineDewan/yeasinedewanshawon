export type AdminMessageCategory = 'inquiry' | 'feedback' | 'collaboration' | 'support';

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string; // ISO
  read: boolean;
  source: 'contact' | 'portfolio' | 'blog';
  category: AdminMessageCategory;
}

export type BlogPostStatus = 'Draft' | 'Published';

export interface AdminBlogPost {
  id: number; // kept numeric to match existing routes
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO
  author: string;
  category: string;
  readTime: number;
  tags: string[];
  image: string;
  status: BlogPostStatus;
}

export interface BlogComment {
  id: string;
  postId: number;
  name: string;
  email?: string;
  message: string;
  date: string; // ISO
  approved: boolean;
}

export type OrderStatus = 'New' | 'In progress' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  serviceTier: 'Starter' | 'Growth' | 'Enterprise';
  amount: number;
  status: OrderStatus;
  date: string; // ISO
  notes?: string;
}

const KEY_MESSAGES = 'admin:messages';
const KEY_BLOG_POSTS = 'admin:blog_posts';
const KEY_COMMENTS = 'admin:blog_comments';
const KEY_ORDERS = 'admin:orders';

const EVENT_NAME = 'admin-store:changed';

function notify() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function subscribeAdminStore(cb: () => void) {
  const onEvent = () => cb();
  const onStorage = (e: StorageEvent) => {
    if (!e.key) return;
    if ([KEY_MESSAGES, KEY_BLOG_POSTS, KEY_COMMENTS, KEY_ORDERS].includes(e.key)) cb();
  };
  window.addEventListener(EVENT_NAME, onEvent);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, onEvent);
    window.removeEventListener('storage', onStorage);
  };
}

export function getMessages(): AdminMessage[] {
  return safeParse<AdminMessage[]>(localStorage.getItem(KEY_MESSAGES), []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function upsertMessage(msg: AdminMessage) {
  const current = getMessages();
  const idx = current.findIndex((m) => m.id === msg.id);
  const next = idx >= 0 ? current.map((m) => (m.id === msg.id ? msg : m)) : [msg, ...current];
  localStorage.setItem(KEY_MESSAGES, JSON.stringify(next));
  notify();
}

export function addMessage(input: Omit<AdminMessage, 'id' | 'read' | 'date'> & { date?: string }) {
  const msg: AdminMessage = {
    id: crypto.randomUUID(),
    date: input.date ?? new Date().toISOString(),
    read: false,
    ...input,
  };
  upsertMessage(msg);
  return msg;
}

export function markMessageRead(id: string, read = true) {
  const current = getMessages();
  const next = current.map((m) => (m.id === id ? { ...m, read } : m));
  localStorage.setItem(KEY_MESSAGES, JSON.stringify(next));
  notify();
}

export function deleteMessage(id: string) {
  const next = getMessages().filter((m) => m.id !== id);
  localStorage.setItem(KEY_MESSAGES, JSON.stringify(next));
  notify();
}

export function getAdminBlogPosts(): AdminBlogPost[] {
  return safeParse<AdminBlogPost[]>(localStorage.getItem(KEY_BLOG_POSTS), []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function upsertAdminBlogPost(post: AdminBlogPost) {
  const current = getAdminBlogPosts();
  const idx = current.findIndex((p) => p.id === post.id);
  const next = idx >= 0 ? current.map((p) => (p.id === post.id ? post : p)) : [post, ...current];
  localStorage.setItem(KEY_BLOG_POSTS, JSON.stringify(next));
  notify();
}

export function deleteAdminBlogPost(id: number) {
  const next = getAdminBlogPosts().filter((p) => p.id !== id);
  localStorage.setItem(KEY_BLOG_POSTS, JSON.stringify(next));
  notify();
}

export function getComments(): BlogComment[] {
  return safeParse<BlogComment[]>(localStorage.getItem(KEY_COMMENTS), []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getCommentsForPost(postId: number) {
  return getComments().filter((c) => c.postId === postId);
}

export function addComment(input: Omit<BlogComment, 'id' | 'date' | 'approved'> & { date?: string; approved?: boolean }) {
  const comment: BlogComment = {
    id: crypto.randomUUID(),
    date: input.date ?? new Date().toISOString(),
    approved: input.approved ?? false,
    ...input,
  };
  const next = [comment, ...getComments()];
  localStorage.setItem(KEY_COMMENTS, JSON.stringify(next));
  notify();
  return comment;
}

export function setCommentApproved(id: string, approved: boolean) {
  const next = getComments().map((c) => (c.id === id ? { ...c, approved } : c));
  localStorage.setItem(KEY_COMMENTS, JSON.stringify(next));
  notify();
}

export function deleteComment(id: string) {
  const next = getComments().filter((c) => c.id !== id);
  localStorage.setItem(KEY_COMMENTS, JSON.stringify(next));
  notify();
}

export function getOrders(): Order[] {
  return safeParse<Order[]>(localStorage.getItem(KEY_ORDERS), []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function upsertOrder(order: Order) {
  const current = getOrders();
  const idx = current.findIndex((o) => o.id === order.id);
  const next = idx >= 0 ? current.map((o) => (o.id === order.id ? order : o)) : [order, ...current];
  localStorage.setItem(KEY_ORDERS, JSON.stringify(next));
  notify();
}

export function addOrder(input: Omit<Order, 'id' | 'date'> & { date?: string }) {
  const order: Order = { id: crypto.randomUUID(), date: input.date ?? new Date().toISOString(), ...input };
  upsertOrder(order);
  return order;
}

export function deleteOrder(id: string) {
  const next = getOrders().filter((o) => o.id !== id);
  localStorage.setItem(KEY_ORDERS, JSON.stringify(next));
  notify();
}

