import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import { api } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/zustand";

const AddCommentForm = ({ postId, userId, refresh }) => {
  const { user } = useStore();
  const commentRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (commentRef && commentRef.current) {
        await api
          .post(`posts/${postId}/${userId}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: commentRef.current.value }),
          })
          .json();
        refresh();
        commentRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-8 flex w-full items-center p-3 space-x-2 fixed bottom-0 left-0 right-0 bg-black-50 rounded-t-3xl dark:bg-black-800 sm:max-w-[450px] sm:justify-self-center">
        <Avatar>
          <AvatarImage src={user?.profilePictureUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          name="content"
          ref={commentRef}
          type="text"
          placeholder="comment here"
        />
        <Button onClick={handleSubmit} type="button">
          Post
        </Button>
      </div>
    </>
  );
};

export default AddCommentForm;
