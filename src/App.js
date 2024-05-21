// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ChatRoom from './ChatRoom';
import './index.css'; 

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register setUser={setUser} />}
        />
        <Route
          path="/chat"
          element={user ? <ChatRoom user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/login"
    //       element={user ? <Navigate to="/chat" /> : <Login setUser={setUser} />}
    //     />
    //     <Route
    //       path="/register"
    //       element={user ? <Navigate to="/chat" /> : <Register setUser={setUser} />}
    //     />
    //     <Route
    //       path="/chat"
    //       element={user ? <ChatRoom user={user} /> : <Navigate to="/login" />}
    //     />
    //     <Route path="/" element={<Navigate to="/login" />} />
    //   </Routes>
    // </Router>
  );
}

export default App;