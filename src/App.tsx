import React, { ChangeEvent, useEffect, useState } from "react";
import MessageItem from "./components/MessageItem.tsx";

export interface IMessage {
  id: string;
  content: string;
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [sentMessages, setSentMessages] = useState<IMessage[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [viewCount, setViewCount] = useState<number>(0); // State for storing view count

  useEffect(() => {
    fetchMessages();
    fetchAndUpdateViewCount();
  }, []);

  const fetchAndUpdateViewCount = async () => {
    try {
      // First, increment the view count by posting to the views endpoint
      await fetch("http://localhost:3001/views", {
        method: "POST",
      });

      // Then, fetch the updated view count
      const response = await fetch("http://localhost:3001/views");
      const data = await response.json();
      setViewCount(data.views); // Assuming the response has a `views` field with the view count
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3001/messages");
      const data: IMessage[] = await response.json();
      setSentMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    const method = editIndex !== null ? "PATCH" : "POST";
    const url =
      editIndex !== null
        ? `http://localhost:3001/messages/${sentMessages[editIndex].id}`
        : "http://localhost:3001/messages";

    const data = { content: message };

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setMessage("");
      setEditIndex(null);
      fetchMessages(); // fetch messages
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteMsg = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/messages/${id}`, {
        method: "DELETE",
      });
      // After deletion, fetch the updated messages list or remove the item from local state
      fetchMessages(); // This fetches the updated list, reflecting the deletion.
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Adjusted to find the index based on the ID for editing
  const editMsgById = (id: string) => {
    const index = sentMessages.findIndex((msg) => msg.id === id);
    if (index !== -1) {
      setMessage(sentMessages[index].content);
      setEditIndex(index);
    }
  };

  return (
    <div className="w-[90%] max-w-5xl my-0 mx-auto">
      <div>Website views: {viewCount}</div>
      <div className="container mx-auto p-4 rounded-lg shadow-lg">
        <textarea
          className="resize-none w-full h-32 p-4 border-2 rounded-lg bg-white/30 backdrop-blur-md"
          value={message}
          placeholder="Type your message"
          onChange={handleInputChange}
        />
        <button
          className={`mt-4 px-6 py-2 font-semi text-white transition-transform duration-300 ease-in-out rounded-md shadow ${
            message.trim() === ""
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gray-700 hover:bg-green-300 hover:text-amber-950 hover:animate-bounce"
          }`}
          onClick={handleSend}
          disabled={message.trim() === ""}
        >
          {editIndex !== null ? "Update Message" : "Send Message"}
        </button>
      </div>

      <div className="mx-auto p-4 mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          All messages {sentMessages.length}:
        </h3>
        <ul className="list-disc pl-5 mt-2">
          {sentMessages.map((msg, index) => (
            <MessageItem
              key={msg.id}
              message={msg}
              onDelete={deleteMsg}
              onEdit={() => editMsgById(msg.id)}
              isEditing={editIndex === index}
              onInputChange={handleInputChange}
              onSaveEdit={handleSend}
              currentMessage={message}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
