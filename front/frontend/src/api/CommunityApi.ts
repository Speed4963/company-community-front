import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/community';

// API 인스턴스 생성 (기본 주소 설정)
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getPostList = () => apiClient.get(`${API_BASE}/posts`);

// 👈 여기 postId 뒤에 : number 를 추가하세요
export const getPostDetail = (postId: number) => apiClient.get(`${API_BASE}/posts/${postId}`);

export const createPost = (data: any) => apiClient.post(`${API_BASE}/posts`, data);

// 👈 여기도 postId: number 를 추가하세요
export const createComment = (postId: number, data: any) => apiClient.post(`${API_BASE}/posts/${postId}/comments`, data);

export const updatePost = (postId: number, data: any) => apiClient.put(`${API_BASE}/posts/${postId}`, data);
export const deletePost = (postId: number) => apiClient.delete(`${API_BASE}/posts/${postId}`);

// 기존에 'throw new Error(...)' 라고 적힌 부분을 찾아서 아래 코드로 완전히 교체하세요
export const recommendPost = async (postId: number) => {
  // 실제 백엔드 컨트롤러 주소와 일치해야 합니다
  return await apiClient.post(`/api/community/posts/${postId}/recommend`);
};