import { create } from "zustand";
import { api } from "@/lib/api";
import { persist } from "zustand/middleware";

export interface UserData {
  email: string;
  emailVerified: boolean;
  username: string;
  _id: string;
  user: UserData;
  loadCurrentUserData: () => void;
}

export interface Posts {
  _id: string;
  title: string;
  content: string;
  userId: string;
  posts: [] | string[];
  imageUrl: string;
  caption: string;
}

export interface Comments {
  _id: string;
  content: string;
  userId: string;
  postId: string;
}

export interface Fulldata {
  _id: string;
  username: string;
  email: string;
  bio: string;
  profilePictureUrl: string;
  followers: [] | string[];
  following: [] | string[];
  userGroup: string;
  passwordHash: string;
  userDataFull: Fulldata;
  getUserdataFull: (id: string) => void;
  job: string;
  birthdate: string;
  url: string;
  gender: string;
}

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      loadCurrentUserData: async () => {
        const data = (await api
          .get(`users/currentUser`, {
            credentials: "include",
          })
          .json()) as UserData;
        set({ user: data });
        const userData = (await api
          .get(`users/${data._id}`, {
            credentials: "include",
          })
          .json()) as UserData;
        set({ user: userData });
        const getPosts = (await api
          .get(`posts/user/${data._id}`, {
            credentials: "include",
          })
          .json()) as Posts[];
        set({ posts: getPosts });
        const getComments = (await api
          .get(`comments`, {
            credentials: "include",
          })
          .json()) as Comments[];
        set({ comments: getComments });
        const FullUserData = (await api
          .get(`users/${data._id}`, {
            credentials: "include",
          })
          .json()) as Fulldata;
        set({ userDataFull: FullUserData });
        return data;
      },

      logout: async () => {
        await api.post(`auth/logout`, {
          credentials: "include",
        });
        set({ user: null });
      },
    }),
    {
      name: "zustand-store",
    }
  )
);
