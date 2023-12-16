import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const pageSizeOfItems=15;
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={<News key="general" pageSize={pageSizeOfItems} country="in" category="general" />}
            />
            <Route
              path="/business"
              exact
              element={<News key="business"  pageSize={pageSizeOfItems} country="in" category="business" />}
            />
            <Route
              path="/entertainment"
              exact
              element={<News key="entertainment"  pageSize={pageSizeOfItems} country="in" category="entertainment" />}
            />
            <Route
              path="/general"
              exact
              element={<News key="general"  pageSize={pageSizeOfItems} country="in" category="general" />}
            />
            <Route
              path="/health"
              exact
              element={<News key="health"  pageSize={pageSizeOfItems} country="in" category="health" />}
            />
            <Route
              path="/science"
              exact
              element={<News key="science"  pageSize={pageSizeOfItems} country="in" category="science" />}
            />
            <Route
              path="/sports"
              exact
              element={<News key="sports"  pageSize={pageSizeOfItems} country="in" category="sports" />}
            />
            <Route
              path="/technology"
              exact
              element={<News key="technology"  pageSize={pageSizeOfItems} country="in" category="technology" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
