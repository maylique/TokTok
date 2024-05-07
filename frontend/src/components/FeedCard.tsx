import { useState, useEffect } from "react";
import { addLike, deletePost } from "@/lib/api";
import FeedHeader from "./FeedHeader";
import { Store, useStore, Post } from "@/zustand";
import "./animations.css";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const FeedCard = ({ post }: { post: Post }) => {
  const { user, loadCurrentUserData } = useStore() as Store;
  const [isLiked, setIsLiked] = useState(
    user ? post.likes.includes(user._id) : false
  );
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return null;

  const navigateToPost = (id) => {
    navigate(`/post/${id}`);
  };

  const [animateLike, setAnimateLike] = useState(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    await addLike(post._id, user!._id);
    if (!post?.likes.includes(user?._id)) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000);
    }
    loadCurrentUserData();
  };

  const deletePostFromFeed = async () => {
    await deletePost(post._id, user!._id);
    loadCurrentUserData();
  };

  return (
    <>
      {showSkeleton ? (
        <div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className=" h-20"></div>
          </div>
          <div className="flex items-center flex-col space-y-3">
            <Skeleton className="h-96 w-96 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <section className="m-3">
          <FeedHeader
            where={"Post"}
            key={post._id}
            profile={post.authorId}
            deletePost={deletePostFromFeed}
          />
          <div className="flex justify-center flex-col gap-4 items-center">
            <div className="w-96 justify-center items-center rounded-3xl">
              <AspectRatio ratio={1 / 1}>
                <img
                  className="w-full h-96 object-cover rounded-3xl"
                  src={post.imageUrl}
                  alt=""
                />
              </AspectRatio>
            </div>
            <p className="self-start ml-5 mr-5">{post.caption}</p>
          </div>
          <div className="m-3 flex">
            <div className="flex m-3">
              <button onClick={handleLike}>
                <img
                  className={animateLike ? "jello-horizontal" : ""}
                  src={
                    post.likes.includes(user!._id)
                      ? "./img/liked.svg"
                      : "./img/favorites.svg"
                  }
                  alt=""
                />
              </button>
              <p className="m-2 min-w-6">{post?.likes.length}</p>
            </div>
            <div className="flex m-3">
              <button
                onClick={() => {
                  navigateToPost(post._id);
                }}
              >
                <img src="./img/comment.svg" alt="" />
              </button>
              <p className="m-2">{post?.comments.length}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeedCard;
