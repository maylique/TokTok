import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Switch } from "@radix-ui/react-switch";
import { useStore } from "@/zustand";

const Header = () => {
    const { logout } = useStore() as { logout: () => void }
    
  return (
    <>
      <header className="flex m-3 justify-between items-center">
        <div className="flex m-3 items-center">
          <img className="max-h- max-w-7" src="./img/logo.jpg" alt="" />
          <h2 className="m-2">TikTak</h2>
        </div>
        <div className="m-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img src="./img/settings.svg" alt="" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Dark Mode</DropdownMenuLabel>
              <DropdownMenuItem>
                <Switch className="m-2" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
