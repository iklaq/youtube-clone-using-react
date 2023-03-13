import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import RecommendedVideos from "./components/RecommendedVideos/RecommendedVideos";
import SearchBar from "./components/SearchBar/SearchBar";
import SideBar from "./components/SideBar/SideBar";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = ()=> {
  const [inputSearch, setInputSearch] = useState("");

  const onToggleSearchButton = (value) => {
    setInputSearch(value);
  };

  return (
    <div className="App">
      <Router>
        <Header
          inputSearch={inputSearch}
          onToggleSearchButton={onToggleSearchButton}
        />

        <Routes>
          <Route path="/video/:videoId" element={<VideoPlayer />} />

          <Route
            path="/"
            element={
              <div className="app__mainpage">
                <SideBar />
                <RecommendedVideos />
              </div>
            }
          />

          <Route
            path="/search"
            element={
              <div className="app__mainpage">
                <SideBar />
                <SearchBar inputSearch={inputSearch} />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
