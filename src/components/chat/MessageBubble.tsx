import { cn } from "@/lib/utils";
import Message from "@/types/message";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "px-4 py-2  max-w-[75%] shadow-sm whitespace-pre-wrap break-words",
          isUser
            ? "bg-primary text-primary-foreground self-end rounded-lg rounded-tr-[2.5px] mt-4"
            : "bg-muted text-muted-foreground self-start rounded-lg rounded-tl-[2.5px] mt-4"
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback>🧑</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
