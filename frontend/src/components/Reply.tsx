import { addCommentLike, getComments, getUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";
import { Comment, User, useStore } from "@/zustand";
import { getTimeSince } from "@/lib/functions";
import AddReply from "./AddReply";

const Reply = ({ replyData, refresh }) => {
  const [comments, setComments] = useState<Comment>();
  const [author, setAuthor] = useState<User>();
  const { user } = useStore();
  const refreshComments = async () => {
    await getComments(replyData).then((json) => {
      setComments(json);
    });
    refresh();
  };

  const getAuthorDetails = async (id) => {
    await getUserData(id).then((json) => {
      setAuthor(json);
    });
  };

  useEffect(() => {
    refreshComments();
  }, []);

  useEffect(() => {
    if (comments?.authorId) {
      getAuthorDetails(comments.authorId);
    }
  }, [comments]);

  const [animateLike, setAnimateLike] = useState(false);

  const handleLike = async () => {
    await addCommentLike(comments._id, user?._id);
    if (!comments?.likes.includes(user?._id)) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000);
    }
    refreshComments();
  };

  const [replyOpen, setReplyOpen] = useState(false);

  const openReply = () => {
    setReplyOpen(!replyOpen);
  };

  // TESTAREA

  const renderReplies = (comments) => {
    return comments?.map((comment) => (
      <div className="ml-10" key={comment._id}>
        <Reply replyData={comment} refresh={refresh} />
        {comment.comments && comment.comments.length > 0
          ? renderReplies(comment.comments)
          : null}
      </div>
    ));
  };

  return (
    <>
      {author ? <FeedHeader profile={author[0]} /> : null}
      <p className="ml-8 mr-8">{comments?.content}</p>
      <section>
        <div className="m-3 flex items-center">
          <div className="flex m-3">
            <button onClick={handleLike}>
              <img
                className={animateLike ? "jello-horizontal" : ""}
                src={
                  comments?.likes.includes(user!._id)
                    ? "/img/liked.svg"
                    : "/img/favorites.svg"
                }
                alt=""
              />
            </button>
            <p className="m-2 min-w-3">{comments?.likes.length}</p>
          </div>
          <div className="flex m-3">
            <button>
              <p onClick={openReply} className=" text-black-400">
                Reply
              </p>
            </button>
          </div>
          <p className="text-black-300 m-2">{getTimeSince(comments?.date)}</p>
        </div>
        {comments?.comments && comments?.comments.length > 0
          ? renderReplies(comments.comments)
          : null}
        {replyOpen ? (
          <AddReply
            postId={comments?._id}
            userId={user?._id}
            setReply={setReplyOpen}
            refresh={refreshComments}
          />
        ) : null}
      </section>
    </>
  );
};

export default Reply;
