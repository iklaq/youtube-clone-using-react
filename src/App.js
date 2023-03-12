import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import RecommendedVideos from "./components/RecommendedVideos/RecommendedVideos";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
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
