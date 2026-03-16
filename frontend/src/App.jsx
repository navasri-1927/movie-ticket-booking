import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createContext } from "react";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TheaterList from "./pages/TheaterList";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProfileSettings from "./pages/ProfileSettings";
import HelpSupport from "./pages/HelpSupport";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddMovie from "./pages/admin/AddMovie";
import ManageMovies from "./pages/admin/ManageMovies";

import TheaterLogin from "./pages/theater/TheaterLogin";
import TheaterRegister from "./pages/theater/TheaterRegister";
import TheaterDashboard from "./pages/theater/TheaterDashboard";
import ManageShows from "./pages/theater/ManageShows";
import AddShow from "./pages/theater/AddShow";

import SeatSelection from "./pages/SeatSelection";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProcessingPage from "./pages/ProcessingPage";
import SuccessPage from "./pages/SuccessPage";
import ManageTheaters from "./pages/admin/ManageTheaters";

export const ThemeContext = createContext();

function App() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Leo",
      language: "Tamil",
      duration: "2h 44m",
      status: "Now Showing",
      genre: "Action",
      releaseDate: "2023-10-10",
      poster: "https://via.placeholder.com/200x250"
    }
  ]);

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [theaterLoggedIn, setTheaterLoggedIn] = useState(false);

  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>

      <div style={theme === "dark" ? styles.dark : styles.light}>

        <Routes>

          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/book/:id" element={<TheaterList />} />

          <Route path="/select-seats/:id" element={<SeatSelection />} />
          <Route path="/theaters/:id" element={<Navigate to="/book/:id" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/help-support" element={<HelpSupport />} />

          {/* Admin */}
          <Route path="/admin-login" element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard adminLoggedIn={adminLoggedIn} setAdminLoggedIn={setAdminLoggedIn} />} />
          <Route path="/admin/add-movie" element={<AddMovie movies={movies} setMovies={setMovies} adminLoggedIn={adminLoggedIn} />} />
          <Route path="/admin/movies" element={<ManageMovies movies={movies} setMovies={setMovies} adminLoggedIn={adminLoggedIn} />} />

          <Route path="/add-movie" element={<Navigate to="/admin/add-movie" />} />
          <Route path="/admin/theaters" element={<ManageTheaters />} />

          {/* Theater */}
          <Route path="/theater-login" element={<TheaterLogin setTheaterLoggedIn={setTheaterLoggedIn} />} />
          <Route path="/theater-register" element={<TheaterRegister />} />
          <Route path="/theater-dashboard" element={<TheaterDashboard theaterLoggedIn={theaterLoggedIn} setTheaterLoggedIn={setTheaterLoggedIn} />} />
          <Route path="/theater/add-show" element={<AddShow />} />
          <Route path="/theater/shows" element={<ManageShows />} />

          {/* Payment */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/success" element={<SuccessPage />} />

        </Routes>

      </div>

    </ThemeContext.Provider>
  );
}

export default App;

const styles = {
  light: {
    background: "#ffffff",
    color: "#000",
    minHeight: "100vh"
  },
  dark: {
    background: "#121212",
    color: "#ffffff",
    minHeight: "100vh"
  }
};