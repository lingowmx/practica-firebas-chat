import { Button } from "../ui/button"
import { useChatStore } from "@/store/chat-store";

export const MessagesHeader = () => {
  const { resetFriend, friend } = useChatStore();
  

  return (
    <header className="border-b-2 p-4 flex items-center">
        <img
          src={friend?.imageURL}
          alt=""
          className="size-14 rounded-lg"
        />
        <div className="pl-4">
          <h3 className="text-lg font-semibold text-gray-700">{friend?.displayName}</h3>
          <p className="text-xs text-gray-50">status</p>
        </div>
        <div className="ml-auto">
          <Button onClick={resetFriend}>Cerrar</Button>
        </div>
      </header>
  )
}
