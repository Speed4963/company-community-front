import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/CommunityApi";
import { useUser } from "../../context/UserContext";

const PostWrite: React.FC = () => {
  console.log("PostWrite 렌더링 중..."); // 이 로그가 찍히나요?
  const { user } = useUser();
  console.log("User 정보:", user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    postTitle: "",
    postContent: "",
    imgUrl: "", // 필요에 따라 추가
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. 필수 데이터가 있는지 확인
  if (!user?.eno) {
    alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
    return;
  }

  // 2. DTO 필드명과 키값을 일치시킨 데이터 구성
  const dataToSend = { 
    postTitle: formData.postTitle,   // DTO 필드명과 일치
    postContent: formData.postContent, // DTO 필드명과 일치
    imgUrl: formData.imgUrl || "",    // 선택사항이지만 빈 문자열로 초기화
    categoryId: 1,                    // 👈 반드시 1 이상의 숫자를 넣어보세요 (기본 카테고리값)
    eno: user.eno                     // user에서 가져온 값
  }; 

  console.log("최종 전송 데이터:", dataToSend); // 👈 F12 콘솔에서 모든 값이 잘 들어갔는지 확인!

  try {
    await createPost(dataToSend);
    alert("글이 등록되었습니다!");
    navigate("/app/posts");
  } catch (err) {
    console.error("등록 실패", err);
    alert("글 등록 실패: 서버 오류가 발생했습니다.");
  }
};

  return (
    <div className="post-write-container" style={{ padding: "20px" }}>
      <h1>글쓰기</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
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
