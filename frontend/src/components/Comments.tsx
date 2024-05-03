import { getComments, getUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";
import { useStore } from "@/zustand";

const Comments = ({ commentData }) => {
  const [comments, setComments] = useState();
  const [author, setAuthor] = useState();
  const { user } = useStore() as Fulldata & UserData;
  const refreshComments = async () => {
    await getComments(commentData).then((json) => {
      setComments(json);
    });
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

  const getTimeSince = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const difference = now - postDate; // Differenz in Millisekunden
    const hours = Math.floor(difference / 3600000); // Umrechnung in Stunden

    if (hours > 24 && hours < 48) {
      const days = Math.floor(hours / 24);
      return `${days} day ago`;
    } else if (hours > 48) {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    } else if (hours === 1) {
      return "1 hour ago";
    }
    return `${hours} hours ago`;
  };
  const [animateLike, setAnimateLike] = useState(false);
  const handleLike = async () => {
    setIsClicked(!isClicked);
    if (!comments?.likes.includes(user?._id)) {
      setAnimateLike(true);
      setTimeout(() => setAnimateLike(false), 1000); // Annahme: Animation dauert 1000ms
    }
    setIsLiked(!isLiked);
    await addLike(comments._id, user._id);
    refreshComments();
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
                  comments?.likes.includes(user?._id)
                    ? "/img/liked.svg"
                    : "/img/favorites.svg"
                }
                alt=""
              />
            </button>
            <p className="m-2">{comments?.likes.length}</p>
          </div>
          <div className="flex m-3">
            <button>
              <p className=" text-black-400">Reply</p>
            </button>
          </div>
          <p className="text-black-300 m-2">{getTimeSince(comments?.date)}</p>
        </div>
      </section>
    </>
  );
};

export default Comments;
