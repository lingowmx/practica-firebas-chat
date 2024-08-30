import { Friends } from "../chat/Friends";
import { Messages } from "../chat/Messages";
import { Profile } from "../chat/Profile";

const ChatLayout = () => {
  return (
    <div className="md:grid md:grid-cols-[2fr_5fr_2fr] h-screen">
      <Friends />
      <Messages />
      <Profile />
    </div>
  );
};

export default ChatLayout;
