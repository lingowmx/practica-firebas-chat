import AuthLayout from "./AuthLayout";
import ChatLayout from "./ChatLayout";
import { useSigninCheck } from "reactfire";
import { useLoadingStore } from "@/store/LoadingStore";

export const RootLayout = () => {
  const {loading} = useLoadingStore();
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === "loading") {
    return <span>loading...</span>;
  }
  

  return (
    <div className="bg-white">{signInCheckResult.signedIn ? <ChatLayout /> : <AuthLayout />}
      
    </div>
  );
};
 