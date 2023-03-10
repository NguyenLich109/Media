import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Messenger from "./screens/Messenger";
import "./App.css";
import "./responsive.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messenger/:id" element={<Messenger />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
