import { BsEmojiSmile } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const MessagesFooter = () => {
  const handleSendMessage = async () => {
    if (!message) return;
    
    console.log(message);

    //clear input
    setMessage("")
    setShowEmojiPicker(false)
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji)
  };

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
