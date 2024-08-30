import AuthLayout from "./AuthLayout";
import ChatLayout from "./ChatLayout";

export const RootLayout = () => {
  const user = true;
  return (
    <div className="bg-white">
      {user ? (
        <ChatLayout/>
      ) : (
        <AuthLayout/>
      )}
    </div>
  );
};
