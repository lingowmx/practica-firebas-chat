import { BsEmojiSmile } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { UserDb } from "@/schemas/firestore-Schema";

const updateLastMessage = async (
  db: Firestore,
  uid: string,
  roomId: string,
  message: string
) => {
  const userRef = doc(db, "users", uid);
  const userData = (await getDoc(userRef)).data() as UserDb;
  console.log("el userData", userData);
  const rooms = userData?.rooms;
  console.log("rooms", rooms);

  const roomUpdateLastMessage = rooms.map((room) => {
    if (room.roomId === roomId) {
      return {
        ...room,
        lastMessage: message,
        timeStamp: new Date().toISOString(),
      };
    }
    return room;
  });
  await updateDoc(userRef, { rooms: roomUpdateLastMessage });
  console.log("roomUpdateLastMessage", roomUpdateLastMessage);
};

interface MessagesFooterProps {
  friends: {
    uid: string;
    displayName: string;
    imageURL: string;
    lastMessage: string;
    roomId: string;
  };
}
export const MessagesFooter = ({ friends }: MessagesFooterProps) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  console.log({ friends });

  const handleSendMessage = async () => {
    if (!message) return;
    try {
      const roomRef = doc(db, "rooms", friends?.roomId);
      await updateDoc(roomRef, {
        messages: arrayUnion({
          message,
          timeStamp: new Date().toISOString(),
          userUid: auth.currentUser!.uid,
        }),
      });
      console.log("message added");

      const currentRoomId = friends?.roomId;
      //Actualizar lastMessage del usuario
      await updateLastMessage(
        db,
        auth.currentUser!.uid,
        currentRoomId,
        message
      );
      //actualizar lastMessage del amigo
      await updateLastMessage(db, friends.uid, currentRoomId, message);

    } catch (error) {
      console.error(error);
    }

    console.log(message);

    //clear input
    setMessage("");
    setShowEmojiPicker(false);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <footer className="border-t-2 p-4 flex items-center gap-1 relative">
      <Button onClick={() => setShowEmojiPicker((prev) => !prev)}>
        <BsEmojiSmile className="text-xl" />
      </Button>
      <div className="absolute bottom-16">
        <EmojiPicker open={showEmojiPicker} onEmojiClick={onEmojiClick} />
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </footer>
  );
};
