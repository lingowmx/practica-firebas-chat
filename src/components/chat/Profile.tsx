import { useAuth, useUser } from "reactfire";
import { Button } from "../ui/button";
import { useChatStore } from "@/store/chat-store";

export const Profile = () => {
  const auth = useAuth();
  const {data: user} = useUser();
  const {resetFriend} = useChatStore();

 

  const handleLogout = async () => {
    resetFriend();
    await auth.signOut();
  };
  return (
    <div className="bg-white p-4 text-xl text-center border-l-2">
      <img
        src={user?.photoURL || "avatar.png"}
        className="mx-auto rounded-md w-24 h-24"
        alt=""
      />
      <h2 className="mt-2"></h2>
      <p className="font-semibold mb-1">{user?.displayName || "Usuario"}</p>
      <p className="text-gray-500 mb-4">{user?.email}</p>
      <Button className="w-full" onClick={handleLogout}>
        Salir
      </Button>
    </div>
  );
};
