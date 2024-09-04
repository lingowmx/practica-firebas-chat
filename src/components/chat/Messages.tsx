import { MessagesHeader } from "./MessagesHeader";
import { MessagesFooter } from "./MessagesFooter";
import { MessagesMain } from "./MessagesMain";
export const Messages = () => {
  return (
    <article className="bg-white grid grid-rows-[auto,1fr,auto] h-screen">
      <MessagesHeader />
      <MessagesMain/>
      <MessagesFooter/>
    </article>
  );
};
