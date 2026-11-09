import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Highlights from "./pages/Highlights";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Animes from "./pages/Animes";
import Login from "./pages/Login";
import ExpandedShelf from "./pages/ExpandedShelf";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>

          <Route element={<Layout />}>
            <Route path="/:nick" element={<Highlights />}/>

            <Route path="/:nick/estante/:tipo" element={<ExpandedShelf />} />
            
            <Route path="/:nick/books" element={<Books />} />

            <Route path="/:nick/movies" element={<Movies />} />

            <Route path="/:nick/series" element={<Series />} />

            <Route path="/:nick/animes" element={<Animes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
