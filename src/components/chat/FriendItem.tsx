import { useChatStore } from "@/store/chat-store";

interface FriendItemProps {
  uid: string;
  displayName: string;
  imageURL: string;
  lastMessage: string;
  roomId: string;
}
export const FriendItem = ({
  uid,
  displayName,
  imageURL,
  lastMessage,
  roomId

}: FriendItemProps) => {
  const { setFriend } = useChatStore();

  return (
    <article className="flex items-center gap-x-4 py-2 px-4 border-b hover:bg-gray-100 cursor-pointer "
    onClick={() =>
      setFriend ({
        uid,
        displayName,
        imageURL,
        lastMessage,
        roomId
      })
     }>
      <img className="rounded-lg w-14 h-14" src={imageURL} alt="user" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg truncate">{displayName}</h3>
        <p className="text-xs text-gray-500 truncate">{lastMessage} </p>
      </div>
    </article>
  );
};
