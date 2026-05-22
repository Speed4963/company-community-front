import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/CommunityApi";
import { useUser } from "../../context/UserContext";

const PostWrite: React.FC = () => {
    const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postTitle: "",
    postContent: "",
    imgUrl: "", // 필요에 따라 추가
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 백엔드에 사용자 eno를 함께 전송
    const dataToSend = { ...formData, eno: user?.eno }; 
    await createPost(dataToSend);
    try {
      // API 호출 (eno는 나중에 로그인 정보에서 가져오세요)
      await createPost(formData);
      alert("글이 작성되었습니다!");
      navigate("/posts"); // 작성 후 목록으로 이동
    } catch (err) {
      console.error("작성 실패:", err);
      alert("작성에 실패했습니다.");
    }
  };

  return (
    <div className="post-write-container" style={{ padding: "20px" }}>
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          name="postTitle"
          placeholder="제목을 입력하세요"
          value={formData.postTitle}
          onChange={handleChange}
          required
        />
        <textarea
          name="postContent"
          placeholder="내용을 입력하세요"
          value={formData.postContent}
          onChange={handleChange}
          rows={10}
          required
        />
        <input
          name="imgUrl"
          placeholder="이미지 URL (선택사항)"
          value={formData.imgUrl}
          onChange={handleChange}
        />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default PostWrite;