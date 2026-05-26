import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, getPostDetail, deletePost } from "../../api/CommunityApi"; // import 정리
import type { PostDetail } from "../../types/Community";

const PostDetailComponent: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comment, setComment] = useState({ eno: "익명", content: "" });

  const handleDelete = async () => {
    if (!postId) return;
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(Number(postId));
        alert("삭제되었습니다.");
        navigate("/posts");
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.content.trim() || !postId) return;

    try {
      await createComment(Number(postId), comment);
      setComment({ ...comment, content: "" });

      const res = await getPostDetail(Number(postId));
      setPost(res.data);
    } catch (err) {
      console.error("댓글 작성 실패:", err);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (postId) {
      getPostDetail(Number(postId))
        .then((res) => setPost(res.data))
        .catch((err) => console.error("상세 조회 실패:", err));
    }
  }, [postId]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="post-detail-container">
      <h1>{post.postTitle}</h1>
      <p>
        작성자: {post.eno} | 조회수: {post.linkCount}
      </p>
      
      {/* 수정 및 삭제 버튼 추가 */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => navigate(`/posts/edit/${postId}`)}>수정</button>
        <button onClick={handleDelete} style={{ color: "red", marginLeft: "10px" }}>
          삭제
        </button>
      </div>

      <hr />
      <div className="content">{post.postContent}</div>

      {/* 댓글 섹션 */}
      <div className="comments-section" style={{ marginTop: "40px" }}>
        <h3>댓글 ({post.comments.length})</h3>

        {post.comments.map((c) => (
          <div
            key={c.commentId}
            className="comment-item"
            style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}
          >
            <strong>{c.eno}</strong>: {c.content}
            <small style={{ marginLeft: "10px", color: "#888" }}>
              ({c.insertTime})
            </small>
          </div>
        ))}

        <div className="comment-input-area" style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="작성자"
            value={comment.eno}
            onChange={(e) => setComment({ ...comment, eno: e.target.value })}
            style={{ display: "block", marginBottom: "5px" }}
          />
          <textarea
            placeholder="댓글을 입력하세요"
            value={comment.content}
            onChange={(e) => setComment({ ...comment, content: e.target.value })}
            style={{ width: "100%", height: "60px", display: "block" }}
          />
          <button onClick={handleCommentSubmit} style={{ marginTop: "5px" }}>
            댓글 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailComponent;