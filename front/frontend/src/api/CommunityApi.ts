import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/community';


export const getPostList = () => axios.get(`${API_BASE}/posts`);

// 👈 여기 postId 뒤에 : number 를 추가하세요
export const getPostDetail = (postId: number) => axios.get(`${API_BASE}/posts/${postId}`);

export const createPost = (data: any) => axios.post(`${API_BASE}/posts`, data);

// 👈 여기도 postId: number 를 추가하세요
export const createComment = (postId: number, data: any) => axios.post(`${API_BASE}/posts/${postId}/comments`, data);

export const updatePost = (postId: number, data: any) => axios.put(`${API_BASE}/posts/${postId}`, data);
export const deletePost = (postId: number) => axios.delete(`${API_BASE}/posts/${postId}`);