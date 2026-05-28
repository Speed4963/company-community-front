import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, updatePost } from "../../api/CommunityApi";
import "../../css/PostUpdate.css"; // CSS 파일 임포트

const PostUpdate: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ postTitle: "", postContent: "", imgUrl: "" });

  useEffect(() => {
    if (postId) {
      getPostDetail(Number(postId)).then(res => setFormData(res.data));
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(Number(postId), formData);
    alert("수정되었습니다!");
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="post-update-container">
      <h2 className="post-update-title">게시글 수정</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label className="form-label">제목</label>
          <input 
            className="form-input"
            value={formData.postTitle} 
            onChange={(e) => setFormData({...formData, postTitle: e.target.value})} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">내용</label>
          <textarea 
            className="form-textarea"
            value={formData.postContent} 
            onChange={(e) => setFormData({...formData, postContent: e.target.value})} 
          />
        </div>
        <button type="submit" className="submit-btn">수정 완료</button>
      </form>
    </div>
  );
};

export default PostUpdate;