import { followUser, unfollowUser } from "@/lib/api";
import { useStore, Store, AllUsers } from "@/zustand";
import { useEffect, useState } from "react";

const SearchFunc = () => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<AllUsers[]>([]);

  const { users, user, loadCurrentUserData } = useStore() as Store;

  const handleSearchInput = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    const filterUsers = () => {
      if (!searchItem.trim()) {
        const excludeOwnId = users!.filter(
          (ownUser) => ownUser._id !== user!._id
        );
        setFilteredUsers(excludeOwnId);
      } else {
        const filtered = users!.filter((userList) =>
          userList.username.toLowerCase().includes(searchItem.toLowerCase())
        );
        const excludeOwnId = filtered!.filter(
          (ownUser) => ownUser._id !== user!._id
        );
        setFilteredUsers(excludeOwnId);
      }
    };
    filterUsers();
  }, [searchItem, users, user]);

  const handleFollow = async (userId, isFollowing) => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      loadCurrentUserData();
    } catch (error) {
      console.error("Fehler beim Folgen/Entfolgen des Benutzers:", error);
    }
  };

  return (
    <>
      <div className="flex-col items-center gap-7 p-6">
        <div className="flex-col items-center gap-6 flex">
          <div className="flex bg-neutral-50 rounded-xl items-center justify-center gap-3 w-full">
            <input
              className="px-5 h-10 bg-black-50 w-3/4 rounded-xl justify-center items-center gap-3 outline-none dark: text-black"
              type="text"
              value={searchItem}
              onChange={handleSearchInput}
              name="username"
              placeholder="search..."
            />
          </div>
          <div className="self-stretch justify-start items-start inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-3 inline-flex">
              <div className="self-stretch justify-center items-center gap-2 inline-flex">
                <div className="px-1 py-0.5 justify-center items-center flex">
                  <img className="w-4 h-5" src="/img/group.svg" />
                </div>
              </div>
              <div className="self-stretch h-1 bg-primary-500 rounded-[100px]"></div>
            </div>
          </div>
          {filteredUsers.map((filteredUser) => {
            const isFollowing = filteredUser?.followers.includes(user!._id);
            return (
              <div
                key={filteredUser._id}
                className="w-full justify-start items-center gap-3 inline-flex"
              >
                <a
                  href={`../profile/${filteredUser._id}`}
                  className="w-full justify-start items-center gap-3 inline-flex"
                >
                  <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-5 flex">
                    <div className="justify-center items-center flex">
                      <img
                        className="w-[60px] h-[60px] rounded-full"
                        src={filteredUser?.profilePictureUrl}
                      />
                    </div>
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="self-stretch text-neutral-800 text-lg font-bold font-['Urbanist'] leading-snug">
                        {filteredUser?.username}
                      </div>
                      <div className="self-stretch text-zinc-600 text-sm font-medium font-['Urbanist'] leading-tight tracking-tight">
                        {filteredUser?.job}
                      </div>
                    </div>
                  </div>
                </a>
                <div
                  className={`px-4 py-1.5 rounded-[100px] justify-center items-center gap-1 flex ${
                    isFollowing
                      ? "bg-white text-primary-500 border-2 border-primary-500"
                      : "bg-primary-500 text-primary-50"
                  }`}
                >
                  <button
                    onClick={() => handleFollow(filteredUser._id, isFollowing)}
                    className={`text-center text-sm font-medium font-['Urbanist'] leading-tight tracking-tight `}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchFunc;
