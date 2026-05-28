import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/CommunityApi";
import { useUser } from "../../context/UserContext";
import "../../css/PostWrite.css";

const PostWrite: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ postTitle: "", postContent: "", imgUrl: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.eno) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    const dataToSend = { ...formData, categoryId: 1, eno: user.eno };

    try {
      await createPost(dataToSend);
      alert("글이 등록되었습니다!");
      navigate("/posts");
    } catch (err) {
      console.error("등록 실패", err);
      alert("글 등록 실패");
    }
  };

  return (
    <div className="post-write-container">
      <h2 className="post-write-title">새 글 쓰기</h2>
      <form onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <label className="form-label">제목</label>
          <input className="form-input" name="postTitle" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">내용</label>
          <textarea className="form-textarea" name="postContent" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">이미지 URL</label>
          <input className="form-input" name="imgUrl" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">등록하기</button>
      </form>
    </div>
  );
};

export default PostWrite;