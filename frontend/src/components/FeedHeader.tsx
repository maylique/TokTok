import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FeedHeader = ({ profile }) => {
  return (
    <>
      <div className="flex mb-3 justify-between">
        <a href={`profile/${profile?._id}`}>
          <div className="flex">
            <Avatar className="m-1">
              <AvatarImage
                className=" object-cover"
                src={profile?.profilePictureUrl}
              />
              <AvatarFallback>{profile?.username}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h5>{profile?.username}</h5>
              <p className="text-gray-500">{profile?.job}</p>
            </div>
          </div>
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src="/img/more.svg" alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default FeedHeader;
