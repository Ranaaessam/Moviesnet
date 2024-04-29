import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import SimpleBackdrop from "../components/spinner";
import MoviesModule from "../pages/MoviesModule";
import AddMoviePage from "../pages/AddMoviePage";
import MoviesContextProvider from "../contexts/MoviesContextProvider";
import SwipeableTextMobileStepper from '../components/slideShow'
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Details = lazy(() => import("../pages/Details"));
const Error = lazy(() => import("../pages/Error"));
const Movies = lazy(() => import("../pages/MoviesPage"));
const NavBar = lazy(() => import("../components/Navbar"));

function App() {
  return (
    <MoviesContextProvider>
      <div className="App">
        <Suspense fallback={<SimpleBackdrop></SimpleBackdrop>}>
        <BrowserRouter>
        <NavBar></NavBar>
        {/* <SwipeableTextMobileStepper></SwipeableTextMobileStepper> */}

      <Routes>
   

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<MoviesModule />}>
          <Route index element={<Movies />} />
          <Route path="add" element={<AddMoviePage />} />
        </Route>
        <Route path="/movies/:id" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
        </Suspense>
      </div>
    </MoviesContextProvider>
  );
}

export default App;