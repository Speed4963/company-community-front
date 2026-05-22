import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, updatePost } from "../../api/CommunityApi";

const PostUpdate: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ postTitle: "", postContent: "", imgUrl: "" });

  useEffect(() => {
    // 기존 데이터 불러오기
    getPostDetail(Number(postId)).then(res => setFormData(res.data));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(Number(postId), formData);
    alert("수정되었습니다!");
    navigate(`/posts/${postId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="postTitle" value={formData.postTitle} onChange={(e) => setFormData({...formData, postTitle: e.target.value})} />
      <textarea name="postContent" value={formData.postContent} onChange={(e) => setFormData({...formData, postContent: e.target.value})} />
      <button type="submit">수정 완료</button>
    </form>
  );
};

export default PostUpdate;