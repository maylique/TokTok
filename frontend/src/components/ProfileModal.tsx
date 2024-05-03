import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProfileModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <img src="../img/more.svg" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] top-[75%] rounded-t-[40px]">
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/settings.svg" />
              <span>Settings</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/archive.svg" />
              <span>Archive</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/activity.svg" />
              <span>Your Activity</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/qr-code.svg" />
              <span>QR Code</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/saved.svg" />
              <span>Saved</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/friends.svg" />
              <span>Close Friends</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/favorites.svg" />
              <span>Favorites</span>
            </div>
            <div className="flex items-center space-x-2 font-semibold">
              <img src="../img/info.svg" />
              <span>Information Center</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileModal;
