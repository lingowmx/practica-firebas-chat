import { useState, useEffect } from "react";
import { FriendItem } from "./FriendItem";
import { FriendsSearch } from "./FriendsSearch";

interface Friend {
  uid: string;
  displayName: string;
  imageURL: string;
  lastMessage: string;
}

export const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await fetch("https://randomuser.me/api/?results=15&nat=mx");
      const { results } = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = results.map((user: any) => ({
        uid: user.login.uuid,
        displayName: user.name.first,
        imageURL: user.picture.large,
        lastMessage: "Hi my name is" + user.name.first,
      }));
      setFriends(data);
    };
    getFriends();
  }, []);
  console.log({ friends });
  return (
    <section className="grid grid-rows-[auto_1fr] h-screen border-r-2">
      <div className="border-b p-4">
        <h2 className="font-bold mb-4 text-2xl">Chats</h2>
        <FriendsSearch />
      </div>
      <div className="bg-white overflow-y-auto overscroll-contain">
        {friends.map((friend) => (
          <FriendItem 
          key={friend.uid}
          displayName={friend.displayName}
          imageURL={friend.imageURL}
          lastMessage={friend.lastMessage} />
        ))}
      </div>
    </section>
  );
};
