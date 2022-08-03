import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
/* Import Components */
import Header from "./components/Header";
/* Import Pages */
import Home from "./views/Home";
import Notes from "./views/Notes";
import Videos from "./views/Videos";
import Movies from "./views/Movies";
import TVShows from "./views/TVShows";
import News from "./views/News";
import Games from "./views/Games";
import Login from "./views/Login";
import Signup from "./views/Signup";

function App() {
   return (
      <div className="App">
         <NoteState>
            <Router>
               <Header />
               <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/notes" element={<Notes />}></Route>
                  <Route path="/videos" element={<Videos />}></Route>
                  <Route path="/movies" element={<Movies />}></Route>
                  <Route path="/tv-shows" element={<TVShows />}></Route>
                  <Route path="/news" element={<News />}></Route>
                  <Route path="/games" element={<Games />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
               </Routes>
            </Router>
         </NoteState>
      </div>
   );
}

export default App;
