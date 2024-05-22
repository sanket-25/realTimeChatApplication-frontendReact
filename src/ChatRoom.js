import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
// import './chat.css'; 

function ChatRoom({ user, setUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Extract email from location state
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
    }
  }, [location]);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://real-time-chat-application-backend.vercel.app');

    // Connection opened
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setWs(socket);
    };

    // Listen for messages
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'history') {
        setMessages(message.data);
      } else {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    // Connection closed
    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat window when new messages are added
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]); // Re-run effect when messages state changes

  // const handleSend = (e) => {
  //   e.preventDefault();
  //   if (newMessage.trim() && ws) {
  //     const message = { userId: "test@email.com", text: newMessage };
  //     ws.send(JSON.stringify(message));
  //     setNewMessage('');
  //   }
  // };

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && ws) {
      const message = { userId: user.email, text: newMessage }; // Use user.email instead of "test@email.com"
    
      // Update the messages state immediately
      setMessages(prevMessages => [...prevMessages, message]);
    
      // Send the message via WebSocket
      ws.send(JSON.stringify(message));
    
      // Clear the input field
      setNewMessage('');
    }
  };
  
  const handleLogout = () => {
    // Clear user data and navigate to login page
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen">
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl">Chat Room</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </header>
    <div id="chat-window" className="flex-grow overflow-auto p-4 bg-gray-100">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-2 max-w-xs rounded-lg ${
            message.userId === email ? 'bg-blue-500 text-white self-end' : 'bg-white border'
          }`}
          style={{ alignSelf: message.userId === email ? 'flex-end' : 'flex-start' }}
        >
          <div className="font-bold">{message.userId}</div>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.text) }} />
        </div>
      ))}
    </div>
    <form className="flex p-4 bg-white border-t" onSubmit={handleSend}>
      <input
        type="text"
        className="flex-grow px-4 py-2 border rounded"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
        Send
      </button>
    </form>
  </div>
  );
}

export default ChatRoom;
