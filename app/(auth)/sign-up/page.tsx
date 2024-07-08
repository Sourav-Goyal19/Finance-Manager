import AuthForm from "./components/auth-form";

const SignUpPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Create Your Account
      </h1>
      <AuthForm />
    </div>
  );
};

export default SignUpPage;
