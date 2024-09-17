import { Message } from "./Message";
import { useEffect, useRef, useState } from "react";
import { Message as MessageSchema } from "@/schemas/firestore-Schema";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { Friend } from "@/store/chat-store";
import { getAuth } from "firebase/auth";
import { format } from "timeago.js";

interface MessagesMainProps {
  friends: Friend;
}

export const MessagesMain = ({ friends }: MessagesMainProps) => {
  const [messages, setMessages] = useState<MessageSchema[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight);
  }, [messages]);

  useEffect(() => {
    const roomsRef = doc(db, "rooms", friends.roomId);
    const unsubscribe = onSnapshot(roomsRef, (document) => {
      if (!document.exists()) {
        console.error("No existe la sala");
        return;
      }
      const roomData = document.data();
      console.log("roomData", roomData);
      // setMessages(roomData?.message);
      if (roomData?.messages && Array.isArray(roomData.messages)) {
        setMessages(roomData.messages); // Asigna los mensajes solo si es un array
      } else {
        setMessages([]); // Si no hay mensajes, asignar un array vacío
      }
    });
    // setMessages(roomData?.messages);
    // if (roomData?.message) {
    //   setMessages(roomData?.messages);
    // } else {
    //   setMessages([]);
    // }
    // });
    return () => {
      unsubscribe();
      setMessages([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends]);
  return (
    <main
      className="bg-indigo-50 space-y-2 overflow-y-auto overscroll-contain py-4 "
      ref={containerRef}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          time={format(message.timeStamp)}
          imageURL={
            message.userUid === auth.currentUser?.uid
              ? auth.currentUser?.photoURL
              : friends.imageURL ||
                "https://avatars.dicebear.com/api/initials/user.svg"
          }
          isCurrentUser={message.userUid === auth.currentUser?.uid}
        />
      ))}
    </main>
  );
};
