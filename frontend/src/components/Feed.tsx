import FeedCard from "./FeedCard";
import { Store, useStore } from "@/zustand";

const Feed = () => {
  
  const { posts } = useStore() as Store;
  
  return (
    <>
      {posts!.map((post) => {
        return (
          <div key={post._id}>
            <FeedCard post={post} />
          </div>
        );
      })}
    </>
  );
};

export default Feed;
