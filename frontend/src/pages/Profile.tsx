import { useStore } from "@/zustand";
import ProfilePosts from "@/components/ProfilePosts";
import ProfileHero from "../components/ProfileHero";
import ProfileHeader from "@/components/ProfileHeader";

const Profile = () => {
  const { user } = useStore();

  return (
    <>
      {user ? (
        <div className="mb-28">
          <ProfileHeader />
          <ProfileHero />
          <ProfilePosts />
        </div>
      ) : null}
    </>
  );
};

export default Profile;
