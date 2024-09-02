interface FriendItemProps {
  displayName: string;
  imageURL: string;
  lastMessage: string;
}
export const FriendItem = ({
  displayName,
  imageURL,
  lastMessage,
}: FriendItemProps) => {
  return (
    <article className="flex items-center gap-x-4 py-2 px-4 border-b hover:bg-gray-100 cursor-pointer ">
      <img className="rounded-lg w-14 h-14" src={imageURL} alt="user" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg truncate">{displayName}</h3>
        <p className="text-xs text-gray-500 truncate">{lastMessage} </p>
      </div>
    </article>
  );
};
