import Order from "./views/Order";
import Home from "./views/Home";
import Admin from "./views/Admin";
import Menu from "./views/Menu";
import Login from "./views/Login";
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import LoginContext from "./context/LoginContext";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    fetch("/verify-token", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
          return response.json();
        }
        throw new Error("Not authenticated");
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      });
  }, []);

  function onLogOut() {
    fetch("/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          return response.json();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [logo, setLogo] = useState<string>("/smiling_7325701.png");

  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ScrollToTop />
        <header>
          <nav>
            <Link to={"/"} className="pizzaurantLogoLink">
              <img
                className="pizzaurantLogo"
                onMouseEnter={() => setLogo("/wink_7325710.png")}
                onMouseLeave={() => setLogo("/smiling_7325701.png")}
                src={logo}
                alt="Pizzaurant Logo"
              />
            </Link>
            <ul className="navLinks">
              <Link className="navlinkbrandname" to={"/"}>
                <li>
                  <h1>Pizzaurant</h1>
                </li>
              </Link>
              <HashLink className="navlinkitem" smooth to="/#menuID">
                <li>MENU</li>
              </HashLink>
              <Link className="navlinkitem" to="/order">
                ORDER
              </Link>
              {isLoggedIn === true && (
                <Link className="navlinkitem" to="/admin">
                  <li>ADMIN</li>
                </Link>
              )}
              {isLoggedIn === false && (
                <Link className="navlinkitem" id="loginlink" to="/login">
                  <li>LOG IN</li>
                </Link>
              )}
              {isLoggedIn === true && (
                <Link
                  className="navlinkitem"
                  id="logout"
                  to="/"
                  onClick={onLogOut}
                >
                  <li>LOG OUT</li>
                </Link>
              )}
            </ul>
          </nav>
          <div className="wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <section className="copyright">
            <h2>Pizzaurant &copy;</h2>
          </section>
          <section className="socials">
            <h3>
              This is a project created by Melker Olofsson for a course in
              Fullstack at IT-Högskolan in Gothenburg, Sweden.
            </h3>
            <h4>Find me here:</h4>
            <div className="sociallink">
              <a href="https://www.instagram.com/melker.o/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="48px"
                  height="48px"
                >
                  <path
                    d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a href="https://github.com/MelkerOlofsson">
                <svg
                  id="git"
                  width="46px"
                  height="46px"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/melker-olofsson-93482227b/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="48px"
                  height="48px"
                >
                  <path
                    d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9 V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977 C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"
                    fill="#fff"
                  />
                </svg>
              </a>
            </div>
          </section>
          <div className="creditlinkcontainer">
            <h4>
              <a href="https://www.freepik.com/author/coolhoren/icons?t=f">
                <u>Icons by Rohim/Coolhoren</u>
              </a>
            </h4>
            <h4>
              <a href="https://www.freepik.com/author/pikisuperstar">
                <u>Images by pikisuperstar on Freepik</u>
              </a>
            </h4>
          </div>
        </footer>
      </LoginContext.Provider>
    </>
  );
}

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <Order />, path: "/order" },
        { element: <Menu />, path: "/menu" },
        { element: <Admin />, path: "/admin" },
        { element: <Login />, path: "/login" },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
