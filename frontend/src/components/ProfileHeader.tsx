import { Store } from "@/zustand";
import { useStore } from "@/zustand";
import ProfileModal from "./ProfileModal";

const ProfileHeader = () => {
  const { user } = useStore() as Store;
  const { logout } = useStore() as Store;
  const { user } = useStore() as Store;
  const { logout } = useStore() as Store;
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <a href="/feed">
          <img src="../img/logo.svg" alt="" className="max-h-10" />
        </a>
        <span className="text-xl font-bold">{user!.username}</span>
      </div>
      <div className="flex items-center space-x-4">
        <img src="/img/add.svg" />
        <img src="/img/edit.svg" onClick={logout} />
        <ProfileModal />
      </div>
    </header>
  );
};

export default ProfileHeader;
