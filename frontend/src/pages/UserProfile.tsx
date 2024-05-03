import { useStore } from "@/zustand";
import UserProfileHeader from "@/components/UserProfileHeader";
import UserProfileHero from "@/components/UserProfileHero";
import UserProfilePosts from "@/components/UserProfilePosts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { getUserById } = useStore();
  const { profileId } = useParams();
  const [profileUser, setProfileUser] = useState<null | object>(null);

  useEffect(() => {
    getUserById(profileId).then((json) => {
      setProfileUser(json);
    });
  }, [profileId, getUserById]);

  return (
    <>
      {profileUser ? (
        <div>
          <UserProfileHeader profile={profileUser} />
          <UserProfileHero profile={profileUser} />
          <UserProfilePosts profile={profileUser} />
        </div>
      ) : null}
    </>
  );
};

export default UserProfile;
