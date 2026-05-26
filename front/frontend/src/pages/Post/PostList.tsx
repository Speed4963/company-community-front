import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostList } from "../../api/CommunityApi";
import type { PostList } from "../../types/Community";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostList[]>([]);

  useEffect(() => {
    getPostList()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("목록 조회 실패:", err));
  }, []);

  return (
    <div className="post-list-container" style={{ padding: "20px" }}>
      <h1>커뮤니티</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ padding: "10px" }}>번호</th>
            <th style={{ padding: "10px" }}>제목</th>
            <th style={{ padding: "10px" }}>작성자</th>
            <th style={{ padding: "10px" }}>작성일</th>
            <th style={{ padding: "10px" }}>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.postId} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ textAlign: "center", padding: "10px" }}>{post.postId}</td>
              <td style={{ padding: "10px" }}>
                <Link to={`/posts/${post.postId}`} style={{ textDecoration: "none", color: "#007bff" }}>
                  {post.postTitle}
                </Link>
              </td>
              <td style={{ textAlign: "center", padding: "10px" }}>{post.eno}</td>
              <td style={{ textAlign: "center", padding: "10px" }}>{post.insert_time}</td>
              <td style={{ textAlign: "center", padding: "10px" }}>{post.linkCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;