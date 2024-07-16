import getCurrentUser from "@/actions/getCurrentUser";
import ClientFilters from "@/components/client-filters";
import HeaderLogo from "@/components/ui/header-logo";
import Navigation from "@/components/ui/navigation";
import UserAvatar from "@/components/ui/user-avatar";
import WelcomeMsg from "@/components/ui/welcome-msg";

const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-3 lg:px-14 pt-8 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserAvatar user={user} />
        </div>
        <WelcomeMsg />
        <ClientFilters user={user} />
      </div>
    </header>
  );
};

export default Header;
