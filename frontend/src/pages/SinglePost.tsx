import AddCommentForm from "@/components/AddCommentForm";
import Comments from "@/components/Comments";
import FeedCard from "@/components/FeedCard";
import FeedHeader from "@/components/FeedHeader";
import { addLike, getSinglePost, getUserData } from "@/lib/api";
import { Store, useStore } from "@/zustand";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTimeSince } from "@/lib/functions";

const SinglePost = () => {
  const { postId } = useParams<{ postId: string }>();

  const navigate = useNavigate();

  const [singlePost, setSinglePost] = useState();
  const [authorDetails, setAuthorDetails] = useState([]);
  const [userData, setUserData] = useState();
  const { user } = useStore() as Store;
  const [isLiked, setIsLiked] = useState(singlePost?.likes.includes(user?._id));
  const [isClicked, setIsClicked] = useState(false);

  const getAuthorDetails = async (id) => {
    await getUserData(id).then((json) => {
      setAuthorDetails(json);
    });
  };

  const refreshSinglePost = async () => {
    await getSinglePost(postId).then((json) => {
      setSinglePost(json);
      getAuthorDetails(json.authorId);
    });
  };

  const [animateLike, setAnimateLike] = useState(false);
  const handleLike = async () => {
    setIsClicked(!isClicked);
    if (!singlePost?.likes.includes(user?._id)) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000); // Annahme: Animation dauert 1000ms
    }
    setIsLiked(!isLiked);
    await addLike(singlePost!._id, user._id);
    refreshSinglePost(postId);
  };

  useEffect(() => {
    refreshSinglePost();
  }, []);
  return (
    <>
      <header className="m-3 mt-10">
        <div className="flex m-2">
          <img
            onClick={() => {
              navigate("/feed");
            }}
            src="/img/arrow.svg"
            alt=""
          />
          <h3 className="ml-2 font-bold">Comments</h3>
        </div>
        <img src="" alt="" />
      </header>
      <FeedHeader profile={authorDetails[0]} />
      <main className="m-2">
        <p className="m-3">{singlePost?.caption}</p>
        <p className="m-3 text-black-300">{getTimeSince(singlePost?.date)}</p>
        {/* <FeedCard post={singlePost} refresh={refreshSinglePost} /> */}
        <section>
          <div className="m-3 flex">
            <div className="flex m-3 min-w-6">
              <button onClick={handleLike}>
                <img
                  className={animateLike ? "jello-horizontal" : ""}
                  //   className={
                  //     singlePost?.likes.includes(user[0]?._id)
                  //       ? "jello-horizontal"
                  //       : ""
                  //   }
                  src={
                    singlePost?.likes.includes(user?._id)
                      ? "/img/liked.svg"
                      : "/img/favorites.svg"
                  }
                  alt=""
                />
              </button>
              <p className="m-2 min-w-6">{singlePost?.likes.length}</p>
            </div>
            <div className="flex m-3">
              <button>
                <img src="/img/comment.svg" alt="" />
              </button>
              <p className="m-2">{singlePost?.comments.length}</p>
            </div>
          </div>
        </section>
      </main>
      <section className=" border-black-400 border-t pt-3 m-3">
        {singlePost?.comments.map((comment) => {
          return (
            <div className=" last-of-type:mb-20" key={comment._id}>
              <Comments
                id={singlePost?._id}
                commentData={comment}
                refresh={refreshSinglePost}
              />
            </div>
          );
        })}
      </section>
      <AddCommentForm
        postId={singlePost?._id}
        userId={user?._id}
        refresh={refreshSinglePost}
      />
    </>
  );
};

export default SinglePost;
