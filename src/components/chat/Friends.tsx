import { useState, useEffect } from "react";
import { FriendItem } from "./FriendItem";
import { FriendsSearch } from "./FriendsSearch";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot, getDoc } from "firebase/firestore";
import { UserRoom } from "@/schemas/firestore-Schema";

 interface Friend {
  uid: string;
  displayName: string;
  imageURL: string;
  lastMessage: string;
  roomId: string;
}

export const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const auth = getAuth();
  const db = getFirestore();

  // useEffect(() => {
  //   const getFriends = async () => {
  //     const res = await fetch("https://randomuser.me/api/?results=15&nat=mx");
  //     const { results } = await res.json();
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const data = results.map((user: any) => ({
  //       uid: user.login.uuid,
  //       displayName: user.name.first,
  //       imageURL: user.picture.large,
  //       lastMessage: "Hi my name is" + user.name.first,
  //     }));
  //     setFriends(data);
  //   };
  //   getFriends();
  // }, []);

  useEffect(() => {
    const userRef = doc(db, "users", auth.currentUser!.uid);
    const unsubscribe = onSnapshot(userRef, (document) => {
      console.log("current data", document.data()?.rooms);
      const friendPromises = document
        .data()
        ?.rooms.map(async (rooms: UserRoom) => {
          console.log("room", rooms);
          const friendRef = doc(db, "users", rooms.friendUid);
          return getDoc(friendRef);
        });
      //Uso de Promise.all para esperar a que todos los friends se carguen
      Promise.all(friendPromises).then((friends) => {
        const data = friends.map((friend) => {
          const room: UserRoom = document
            .data()
            ?.rooms.find((rooms: UserRoom) => rooms.friendUid === friend.id);
          console.log(room);
          const data = friend.data();
          console.log(friend.data());
          return {
            uid: data.uid,
            displayName: data.displayName,
            imageURL: data.photoURL,
            lastMessage: room?.lastMessage,
            roomId: room.roomId,
          };
        });
        setFriends(data);
      });
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            lastMessage={friend.lastMessage}
            roomId={friend.roomId}
            uid={friend.uid}
          />
        ))}
      </div>
    </section>
  );
};
