import { BsEmojiSmile } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


interface MessagesFooterProps {
 friends: {
    uid: string;
    displayName: string;
    imageURL: string;
    lastMessage: string;
    roomId: string;
 }
}
export const MessagesFooter = ({friends}: MessagesFooterProps) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  console.log({friends});

  const handleSendMessage = async () => {
    if (!message) return;
    try {
      const roomRef = doc(db, "rooms", friends?.roomId);
      await updateDoc(roomRef, {
        messages: arrayUnion({
          message,
          timeStamp: new Date().toISOString(),
          userUid: auth.currentUser!.uid,
        })
      })
      console.log("message added");
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
