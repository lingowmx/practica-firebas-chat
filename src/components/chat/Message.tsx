import { cn } from "@/lib/utils";

interface MessageProps {
  message: string;
  time: string;
  imageURL: string;
  isCurrentUser: boolean;
}

export const Message = ({
  message,
  time,
  imageURL,
  isCurrentUser,
}: MessageProps) => {
  return (
    <article
      className={cn("flex gap-x-2", {
        "flex-row-reverse": isCurrentUser,
        "flex-row": !isCurrentUser,
      })}
    >
      <img src={imageURL} className="rounded-full size-12 mt-2 mx-2" alt="" />
      <div className={cn("p-1 mt-2 rounded-md max-w-[75%] h-full shadow-multi-layer", {
        "bg-white": !isCurrentUser,
        "bg-pink-100": isCurrentUser,
      })}>
        <div>
          {message}
          <p className="text-right text-xs text-gray-400">{time}</p>
        </div>
      </div>
    </article>
  );
};
