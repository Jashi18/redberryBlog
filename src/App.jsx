import { Route, BrowserRouter, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import AddBlog from "./AddBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="addBlog" element={<AddBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
