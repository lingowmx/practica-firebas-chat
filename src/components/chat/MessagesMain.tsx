import { Message } from "./Message";
import { useEffect, useState } from "react";
import { Message as MessageSchema } from "@/schemas/firestore-Schema";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { Friend } from "@/store/chat-store";

interface MessagesMainProps {
  friends: Friend;
}

export const MessagesMain = ({ friends }: MessagesMainProps) => {
  const [messages, setMessages] = useState<MessageSchema[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const roomsRef = doc(db, "rooms", friends?.roomId);
    console.log("room", roomsRef);
    const unsubscribe = onSnapshot(roomsRef, (document) => {
      setMessages(document.data()?.message);
    });
    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="bg-indigo-50 space-y-2 overflow-y-auto overscroll-contain">
      {
        messages.map((mesagges, index) => (
          <Message
            key= {index}
            message = {mesagges.message}  
            time = {mesagges.timeStamp}
            imageURL = {mesagges.userUid === friends?.uid ? friends?.imageURL : "https://randomuser.me/api/portraits/men/63.jpg"}
            isCurrentUser = {mesagges.userUid === friends?.uid}
          />
        ))
      }
    </main>
  );
};
