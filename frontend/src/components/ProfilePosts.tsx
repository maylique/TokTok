import { CardContent } from "@/components/ui/card";
import { useStore } from "@/zustand";

const ProfilePosts = () => {
  const { posts } = useStore()

  return (
    <>
    { posts ? (
      <>
    <div className="flex justify-center w-32">
    <div className="p-4 cursor-pointer">
      <div className="flex flex-row gap-2 justify-center">
        <img src="../img/feeds.svg" />
        <p className="text-xl font-semibold text-primary-500">Feeds</p>
      </div>
      <div className="border-2 border-primary-500 mt-2 w-28"></div>
    </div>
  </div>
  <CardContent className="p-2 flex flex-col items-center">
    <div className="grid grid-cols-3 gap-0.5 max-w-3xl">
      {posts.map((post) => (
        <a
          href={`post/${post._id}`}
          key={post._id}
          className="aspect-square"
        >
          <img
            alt={post.caption ? post.caption : "post"}
            className="aspect-square object-cover border-2 border-gray-100 border-t-0 border-l-0 w-full rounded-xl"
            height={400}
            src={post.imageUrl}
            width={400}
            key={post._id}
          />
        </a>
      ))}
    </div>
  </CardContent>
  </>
    ) : null}
      
    </>
  );
};

export default ProfilePosts;
