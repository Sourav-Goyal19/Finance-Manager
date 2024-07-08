import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import UserAvatar from "./user-avatar";
import WelcomeMsg from "./welcome-msg";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-3 lg:px-14 pt-8 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserAvatar />
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};

export default Header;
