import { IMessage } from "../App.tsx";
import { memo } from "react";

interface MessageItemProps {
  message: IMessage;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isEditing: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveEdit: () => void;
  currentMessage: string;
}

/**
 * Using React.memo for the MessageItem component is indeed a good practice,
 * especially in scenarios where the component might re-render frequently due to changes in the parent component
 * that do not affect the individual MessageItem components.
 * React.memo is a higher-order component that memoizes your component,
 * meaning it will only re-render if its props change.
 *
 * Given the dynamic nature of the MessageItem component,
 * where each item might change independently of the others
 * (such as editing one message while others remain unchanged),
 * wrapping it in React.memo can prevent unnecessary re-renders,
 * improving performance.
 * */

const MessageItem = memo(
  ({
    message,
    onDelete,
    onEdit,
    isEditing,
    onInputChange,
    onSaveEdit,
    currentMessage,
  }: MessageItemProps) => {
    return (
      <li className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow">
        {isEditing ? (
          <textarea
            className="w-full h-24 p-2 border-2 border-gray-300 rounded-md"
            value={currentMessage}
            onChange={onInputChange}
            onBlur={onSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && onSaveEdit()}
          />
        ) : (
          <p className="inline-flex items-center justify-between w-full text-gray-800 dark:text-gray-200">
            {message.content}
            <span className="flex">
              <button
                onClick={() => onDelete(message.id)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-500 ml-4"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(message.id)}
                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-500 ml-2"
              >
                Edit
              </button>
            </span>
          </p>
        )}
      </li>
    );
  },
);

export default MessageItem;
