import getCurrentUser from "@/actions/getCurrentUser";

const WelcomeMsg = async () => {
  const user = await getCurrentUser();
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl selection:bg-white text-white font-medium">
        Welcome back{user ? ", " : " "}
        {user?.name}👋🏻
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        This is your financial report
      </p>
    </div>
  );
};

export default WelcomeMsg;
