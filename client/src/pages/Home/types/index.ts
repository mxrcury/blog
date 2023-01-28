export type Post = {
  id: number,
  title: string,
  caption: string,
  content: string,
  created_at: string,
  created_by: string,
  isLiked?: boolean,
  likesQty: number
}
