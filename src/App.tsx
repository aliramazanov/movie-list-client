import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Empty from "./pages/Empty";
import Home from "./pages/Home";
import Movies from "./pages/Movies";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="app"></div>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Home />} path="/home" />
          <Route element={<Empty />} path="/empty" />
          <Route element={<Movies />} path="/my-movies" />
          <Route element={<Create />} path="/create-movie" />
          <Route element={<Edit />} path="/edit-movie/:id" />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
