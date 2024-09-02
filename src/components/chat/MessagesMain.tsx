import { Message } from "./Message";
export const MessagesMain = () => {
  return (
    <main className="bg-indigo-100 space-y-2">
      <Message
        message="Lorem ipsum"
        time="right now"
        imageURL="https://randomuser.me/api/portraits/men/63.jpg"
        isCurrentUser={true}
      />
      <Message
        message="Lorem ipsum mas texto para que se vea distnito"
        time="22/02/2023"
        imageURL="https://randomuser.me/api/portraits/men/63.jpg"
        isCurrentUser={false}
      />
      <Message
        message="Lorem ipsum mas texto para que se vea distnito"
        time="22/02/2023"
        imageURL="https://randomuser.me/api/portraits/men/63.jpg"
        isCurrentUser={true}
        />
    </main>
  );
};
