import UserProfileModal from "./UserProfileModal";

const UserProfileHeader = ({ profile }) => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <a href="/feed">
          <img src="../img/arrow.svg" alt="" className="max-h-10" />
        </a>
        <span className="text-xl font-bold">{profile.username}</span>
      </div>
      <div className="flex items-center space-x-4">
        <UserProfileModal />
      </div>
    </header>
  );
};

export default UserProfileHeader;
