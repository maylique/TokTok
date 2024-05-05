import { Post, User } from "@/zustand";
import ky from "ky";

export const api = ky.create({ prefixUrl: import.meta.env.VITE_BACKEND_URL });

export const getAllUsers = () =>
  api.get("users", { credentials: "include" }).json();
export const getFeed = () =>
  api.get("posts", { credentials: "include" }).json();
export const getUserData = (id: string): Promise<User[]> =>
  api.get(`users/${id}`, { credentials: "include" }).json();
export const addLike = (postId, userId) =>
  api.post(`posts/like/${postId}/${userId}`, { credentials: "include" }).json();
export const getSinglePost = (id: string): Promise<Post> =>
  api.get(`posts/${id}`, { credentials: "include" }).json();
export const getComments = (id) =>
  api.get(`comments/${id}`, { credentials: "include" }).json();
export const followUser = (id) =>
  api.post(`users/${id}/follow`, { credentials: "include" }).json();
export const unfollowUser = (id) =>
  api.post(`users/${id}/unfollow`, { credentials: "include" }).json();
export const addCommentLike = (commentId, userId) =>
  api
    .post(`comments/like/${commentId}/${userId}`, { credentials: "include" })
    .json();
export const deletePost = (id, userId) =>
  api.delete(`posts/delete/${id}/${userId}`, { credentials: "include" }).json();
export const deleteMainComment = (postId, commentId, userId) =>
  api
    .delete(`posts/deleteComment/${postId}/${commentId}/${userId}`, {
      credentials: "include",
    })
    .json();
