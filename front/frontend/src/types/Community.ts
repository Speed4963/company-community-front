export interface Comment {
  commentId: number;
  eno: string;
  content: string;
  insertTime: string;
}

export interface PostDetail {
  postId: number;
  postTitle: string;
  postContent: string;
  eno: string;
  imgUrl: string;
  linkCount: number;
  insertTime: string;
  updateTime: string;
  comments: Comment[]; // 👈 아까 추가한 댓글 목록
}

export interface PostList {
  postId: number;
  postTitle: string;
  eno: string;
  insert_time: string;
  linkCount: number;
}