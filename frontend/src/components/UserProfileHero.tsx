import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, useStore } from "@/zustand";
import { Button } from "./ui/button";
import { followUser, unfollowUser } from "@/lib/api";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const UserProfileHero = ({ profile }) => {
  const { user, getPostsByUserId } = useStore();
  const [followers, setFollowers] = useState(profile.followers);
  const [following, setFollowing] = useState(profile.following);
  const [isFollowing, setIsFollowing] = useState(
    profile?.followers.includes(user!._id)
  );
  const [posts, setPosts] = useState<Post[]>(null);
  useEffect(() => {
    getPostsByUserId(profile._id).then((json) => {
      setPosts(json);
    });
  }, [profile._id, getPostsByUserId]);

  const handleFollow = async (userId, isFollowing) => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        setFollowers(followers.filter((follower) => follower !== user!._id));
      } else {
        await followUser(userId);
        setIsFollowing(true);
        setFollowers([...followers, user!._id]);
      }
    } catch (error) {
      console.error("Fehler beim Folgen/Entfolgen des Benutzers:", error);
    }
  };

  return (
    <>
      <Card className="w-full rounded-none border-none flex flex-col items-center shadow-none">
        <CardHeader className="p-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-40 h-40 border">
              <AvatarImage
                src={profile.profilePictureUrl}
                className="w-full h-full object-cover"
              />
              <AvatarFallback>{profile.username}</AvatarFallback>
            </Avatar>
            <div className="text-3xl font-bold">{user!.fullname}</div>
            <div className="text-xl">{profile.job}</div>
            <div className="text-lg font-normal text-black-500">
              {user!.bio}
            </div>
            <div className="text-lg font-normal text-black-700">
              <a href={`${profile.website}`}>{profile.website}</a>
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
              {" "}
              <div>
                <span className="font-bold">{posts?.length}</span> Posts
              </div>
              <Separator orientation="vertical" />
              <div>
                <span className="font-bold">{profile.followers.length}</span>{" "}
                Follower
              </div>
              <Separator orientation="vertical" />
              <div>
                <span className="font-bold">{followers.length}</span> Following
              </div>
            </div>
            <Button
              type="submit"
              className="bg-primary-500 hover:bg-primary-500 sm:bg-primary-100 rounded-3xl min-w-[300px] mb-6 "
              onClick={() => handleFollow(profile._id, isFollowing)}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Separator className="my-4" />
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default UserProfileHero;
