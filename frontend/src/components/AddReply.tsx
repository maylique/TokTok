import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import { api } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store, useStore } from "@/zustand";

const AddReply = ({ postId, userId, refresh, setReply }) => {
  const { user } = useStore() as Store;
  const commentRef = useRef<HTMLInputElement>();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentRef && commentRef.current) {
    try {
      await api
        .post(`comments/reply/${postId}/${userId}`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: commentRef.current.value }),
        })
        .json();
      setReply(false);
      refresh();
      commentRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
    }
  };

  return (
    <>
      <div className="mt-8 flex w-full items-center p-3 space-x-2 bg-black-50 rounded-3xl dark:bg-black-800 ">
        <Avatar>
          <AvatarImage src={user?.profilePictureUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Input
          name="content"
          ref={commentRef}
          type="text"
          placeholder="reply here"
        />
        <Button onClick={handleSubmit} type="button">
          Post
        </Button>
      </div>
    </>
  );
};

export default AddReply;
