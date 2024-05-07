import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/zustand";
import { useNavigate } from "react-router-dom";

const FeedHeader = ({ profile, deletePost, where }) => {
  const navigate = useNavigate();
  const { user } = useStore();
  return (
    <>
      <div className="flex m-3 justify-between">
        <div className="flex">
          <a href={`/profile/${profile._id}`} className="flex">
            <Avatar className="m-1">
              <AvatarImage
                className=" object-cover"
                src={profile?.profilePictureUrl}
              />
              <AvatarFallback>{profile?.username}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center ml-3">
              <h5>{profile?.username}</h5>
              {profile?.job ? (
                <p className="text-black-400 text-sm">{profile?.job}</p>
              ) : null}
            </div>
          </a>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src="/img/more.svg" alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate(`/profile/${profile._id}`);
              }}
            >
              Profile
            </DropdownMenuItem>
            {profile._id == user._id ? (
              <DropdownMenuItem
                style={{ color: "red" }}
                onClick={() => {
                  deletePost();
                }}
              >
                Delete {where}
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FeedHeader;
