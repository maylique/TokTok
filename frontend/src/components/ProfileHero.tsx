import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, useStore } from "@/zustand";
import { useEffect, useState } from "react";

const ProfileHero = () => {
  const { user, getPostsByUserId } = useStore();
  const [posts, setPosts] = useState<Post[]>(null);
  useEffect(() => {
    getPostsByUserId(user._id).then((json) => {
      setPosts(json);
    });
  }, [user._id, getPostsByUserId]);

  return (
    <>
      <Card className="w-full rounded-none border-none flex flex-col items-center shadow-none">
        <CardHeader className="p-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-40 h-40 border">
              <AvatarImage
                src={user!.profilePictureUrl}
                className="w-full h-full object-cover"
              />
              <AvatarFallback>{user!.username}</AvatarFallback>
            </Avatar>
            <a href={`/edit-profile/${user!._id}`}>
              <div className="relative w-20">
                <div className="absolute bottom-3 left-[90%] sm:left-[54%] sm:top-[40%] w-full">
                  <img src="../img/profile-edit.svg" />
                </div>
              </div>
            </a>
            <div className="text-3xl font-bold">{user!.fullname}</div>
            <div className="text-xl">{user!.job}</div>
            <div className="text-lg font-normal text-black-500">
              {user!.bio}
            </div>
            <div className="text-lg font-normal text-black-700 text-center">
              <a href={`${user!.website}`}>{user!.website}</a>
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
              {" "}
              <div>
                <span className="font-bold">{posts?.length}</span> Posts
              </div>
              <Separator orientation="vertical" />
              <div>
                <span className="font-bold">{user!.followers.length}</span>{" "}
                Follower
              </div>
              <Separator orientation="vertical" />
              <div>
                <span className="font-bold">{user!.following.length}</span>{" "}
                Following
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default ProfileHero;
