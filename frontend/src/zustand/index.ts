import { create } from "zustand";
import { api } from "@/lib/api";
import { persist } from "zustand/middleware";
export interface User {
  _id: string;
  profilePictureUrl: string;
  username: string;
  job: string;
  followers: string[];
  following: string[];
  userGroup: string;
  passwordHash: string;
  bio: string;
  email: string;
  emailVerified: boolean;
  birthdate: string;
  url: string;
  phone: string;
  website: string;
  gender: string;
  fullname: string;
}

export interface AllUsers {
  _id: string;
  profilePictureUrl: string;
  username: string;
  job: string;
  followers: string[];
  following: string[];
  userGroup: string;
  passwordHash: string;
  bio: string;
  email: string;
  emailVerified: boolean;
  birthdate: string;
  url: string;
  phone: string;
}

export interface Post {
  _id: string;
  authorId: User;
  imageUrl: string;
  likes: string[];
  comments: Comment[];
  caption: string;
  date: string;
}

export interface Comment {
  _id: string;
  authorId: string;
  postId: string;
  content: string;
  likes: string[];
  date: string;
  comments: Comment[];
  value: string;
}

export interface Store {
  user: User | null;
  posts: Post[] | null;
  comments: Comment[] | null;
  users: AllUsers[] | null;
  userId: User | null;
  getUserById: (userId: string) => Promise<User>;
  loadCurrentUserData: () => void;
  logout: () => void;
  getPostsByUserId: (userId: string) => Promise<Post[]>;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      posts: [],
      comments: [],
      users: [],
      userId: null,
      loadCurrentUserData: async () => {
        try {
          const currentUser = (await api
            .get("users/currentUser", { credentials: "include" })
            .json()) as User;
          const [userData, userPosts, userComments, allUsers] =
            await Promise.all([
              api
                .get(`users/${currentUser._id}`, { credentials: "include" })
                .json() as Promise<User>,
              api
                .get(`posts`, {
                  credentials: "include",
                })
                .json() as Promise<Post[]>,
              api
                .get(`comments`, {
                  credentials: "include",
                })
                .json() as Promise<Comment[]>,
              api.get(`users`, { credentials: "include" }).json() as Promise<
                AllUsers[]
              >,
            ]);
          set({
            user: userData[0],
            posts: userPosts,
            comments: userComments,
            users: allUsers,
          });
        } catch (error) {
          set({ user: null });
        }
      },
      getUserById: async (userId: string) => {
        const user = (await api
          .get(`users/${userId}`, { credentials: "include" })
          .json()) as User;
        return user[0];
      },
      getPostsByUserId: async (userId: string) => {
        const userPosts = (await api
          .get(`posts/user/${userId}`, { credentials: "include" })
          .json()) as Post[];
        return userPosts;
      },
      logout: async () => {
        await api.post("auth/logout", { credentials: "include" });
        set({ user: null });
        window.location.href = "/login";
      },
    }),
    {
      name: "zustand-store",
    }
  )
);
