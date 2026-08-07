import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layout/Layout";
import Highlights from "./pages/Highlights";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Highlights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
