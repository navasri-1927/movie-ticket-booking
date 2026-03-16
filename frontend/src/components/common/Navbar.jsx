import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../App";

const Navbar = () => {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const signRef = useRef(null);
  const locationRef = useRef(null);
  const popupRef = useRef(null);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showSignMenu, setShowSignMenu] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [city, setCity] = useState("Chennai");
  const [showLocation, setShowLocation] = useState(false);

  const IMG_URL = "https://image.tmdb.org/t/p/w200";

  const TMDB_API_KEY = "418fa86a2c7f58ec4d60820d43d41ec5";
  const TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

  const cities = [
    "Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Kolkata",
    "Pune", "Ahmedabad", "Coimbatore", "Madurai", "Trichy", "Salem",
    "Tirunelveli", "Vellore", "Erode", "Tiruppur", "Goa", "Mysore",
    "Vizag", "Vijayawada", "Lucknow", "Jaipur", "Chandigarh", "Bhopal", "Indore"
  ];

  // SEARCH MOVIES
  const handleSearch = async (value) => {

    setQuery(value);

    if (value.trim().length > 1) {

      try {

        const res = await axios.get(
          `${TMDB_SEARCH_URL}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(value)}`
        );

        if (res.data && Array.isArray(res.data.results)) {

          const movies = res.data.results.map((movie) => ({
            _id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path
          }));

          setSuggestions(movies);

        } else {
          setSuggestions([]);
        }

      } catch (err) {
        console.log("Search error", err);
        setSuggestions([]);
      }

    } else {
      setSuggestions([]);
    }

  };

  // ENTER KEY SEARCH
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && suggestions.length > 0) {

      const movie = suggestions[0];

      navigate(`/movie/${movie._id || movie.id}`);

      setSuggestions([]);
      setQuery("");

    }

  };

  // CHECK LOGIN
  useEffect(() => {

    const token = localStorage.getItem("token");
    const image = localStorage.getItem("profileImage");
    const savedCity = localStorage.getItem("city");

    if (token) setIsLoggedIn(true);
    if (image) setProfileImage(image);
    if (savedCity) setCity(savedCity);

  }, []);

  // CLOSE DROPDOWNS
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      if (signRef.current && !signRef.current.contains(event.target)) {
        setShowSignMenu(false);
      }

      if (
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setShowLocation(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const handleLogout = () => {

    localStorage.clear();
    navigate("/login");

  };

  const selectCity = (c) => {

    setCity(c);
    localStorage.setItem("city", c);
    setShowLocation(false);

  };

  return (
    <>

      <div style={styles.navbar}>

        <div style={styles.logo} onClick={() => navigate("/")}>
          Cini<span style={{ color: "#e50914" }}>Zone</span>
        </div>

        <div style={styles.locationContainer} ref={locationRef}>

          <div
            style={styles.locationButton}
            onClick={() => setShowLocation(!showLocation)}
          >
            📍 {city} ▼
          </div>

        </div>

        <div style={styles.searchContainer} ref={searchRef}>

          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.searchInput}
          />

          {suggestions.length > 0 && (

            <div style={styles.dropdown}>

              {suggestions.slice(0, 5).map((movie) => (

                <div
                  key={movie._id || movie.id}
                  style={styles.dropdownItem}
                  onClick={() => {
                    navigate(`/movie/${movie._id || movie.id}`);
                    setSuggestions([]);
                    setQuery("");
                  }}
                >

                  <img
                    src={
                      movie.poster_path
                        ? `${IMG_URL}${movie.poster_path}`
                        : "https://via.placeholder.com/40"
                    }
                    alt={movie.title}
                    style={styles.poster}
                  />

                  <span>{movie.title}</span>

                </div>

              ))}

            </div>

          )}

        </div>

        <div style={styles.rightSection}>

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            style={styles.themeBtn}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {!isLoggedIn && (

            <div style={styles.signContainer} ref={signRef}>

              <button
                style={styles.signInBtn}
                onClick={() => {
                  setShowSignMenu(!showSignMenu);
                  setShowMenu(false);
                }}
              >
                Sign In
              </button>

              {showSignMenu && (

                <div style={styles.signDropdown}>

                  <div style={styles.menuItem} onClick={() => navigate("/login")}>
                    User Login
                  </div>

                  <div style={styles.menuItem} onClick={() => navigate("/admin-login")}>
                    Admin Login
                  </div>

                  <div style={styles.menuItem} onClick={() => navigate("/theater-login")}>
                    Theater Owner Login
                  </div>

                </div>

              )}

            </div>

          )}

          <div style={styles.menuContainer} ref={menuRef}>

            <div
              style={styles.hamburger}
              onClick={() => {
                setShowMenu(!showMenu);
                setShowSignMenu(false);
              }}
            >
              ☰
            </div>

            {showMenu && (

              <div style={styles.menuDropdown}>

                <div style={styles.menuItem} onClick={() => navigate("/profile-settings")}>
                  Profile Settings
                </div>

                <div style={styles.menuItem} onClick={() => navigate("/register")}>
                  Setup New Profile
                </div>

                <div style={styles.menuItem} onClick={() => navigate("/help-support")}>
                  Help & Support
                </div>

                <div style={styles.menuItem} onClick={handleLogout}>
                  Sign Out
                </div>

              </div>

            )}

          </div>

          {isLoggedIn && (

            <div
              style={styles.profileContainer}
              onClick={() => navigate("/profile-settings")}
            >

              <img
                src={
                  profileImage
                    ? profileImage
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile"
                style={styles.profileImg}
              />

            </div>

          )}

        </div>

      </div>

      {showLocation && (

        <div style={styles.locationPopup} ref={popupRef}>

          <h3>Select Your City</h3>

          <div style={styles.cityGrid}>

            {cities.map((c) => (
              <div
                key={c}
                style={styles.cityItem}
                onClick={() => selectCity(c)}
              >
                {c}
              </div>
            ))}

          </div>

        </div>

      )}

    </>
  );
};

export default Navbar;

const styles = {

  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 40px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 1000 },
  logo: { fontSize: "24px", fontWeight: "bold", cursor: "pointer" },
  locationContainer: { cursor: "pointer" },
  locationButton: { fontWeight: "600" },
  searchContainer: { position: "relative", width: "40%" },
  searchInput: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" },
  dropdown: { position: "absolute", top: "42px", width: "100%", background: "#fff", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 999 },
  dropdownItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px", cursor: "pointer" },
  poster: { width: "40px", height: "60px", borderRadius: "4px" },
  rightSection: { display: "flex", alignItems: "center", gap: "15px" },
  signContainer: { position: "relative" },
  signInBtn: { padding: "8px 16px", border: "none", background: "#f84464", color: "#fff", borderRadius: "6px", cursor: "pointer" },
  signDropdown: { position: "absolute", top: "38px", right: 0, background: "#fff", width: "180px", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 999 },
  hamburger: { fontSize: "20px", cursor: "pointer" },
  menuContainer: { position: "relative" },
  menuDropdown: { position: "absolute", right: 0, top: "38px", background: "#fff", width: "200px", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  menuItem: { padding: "12px", cursor: "pointer", borderBottom: "1px solid #eee" },
  profileContainer: { cursor: "pointer" },
  profileImg: { width: "36px", height: "36px", borderRadius: "50%" },
  locationPopup: { position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", background: "#fff", padding: "25px", width: "500px", borderRadius: "8px", boxShadow: "0 6px 20px rgba(0,0,0,0.2)", zIndex: 2000 },
  cityGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginTop: "10px" },
  cityItem: { padding: "10px", background: "#f5f5f5", borderRadius: "6px", cursor: "pointer", textAlign: "center" },

  themeBtn: {
    padding: "6px 10px",
    border: "none",
    background: "#eee",
    borderRadius: "6px",
    cursor: "pointer"
  }

};