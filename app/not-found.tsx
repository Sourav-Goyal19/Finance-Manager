import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col p-4 lg:p-0 items-center justify-center h-screen bg-gray-100">
      <Image src="/not-found.svg" alt="Not Found" width={400} height={400} />
      <h1 className="text-4xl font-bold text-gray-800 mt-8">Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4 text-center">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
    </div>
  );
};

export default NotFound;
