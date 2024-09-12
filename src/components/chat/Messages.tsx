import { MessagesHeader } from "./MessagesHeader";
import { MessagesFooter } from "./MessagesFooter";
import { MessagesMain } from "./MessagesMain";
import { useChatStore } from "@/store/chat-store";
export const Messages = () => {
  const { friend } = useChatStore();
  if (!friend)
    return (
      <div className="grid place-items-center h-screen">
        <p>Select a friend to start chatting</p>
      </div>
    );
  return (
    <article className="bg-white grid grid-rows-[auto,1fr,auto] h-screen">
      <MessagesHeader />
      <MessagesMain friends={friend} />
      <MessagesFooter friends={friend} />
    </article>
  );
};
