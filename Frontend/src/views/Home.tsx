import Menu from "./Menu.jsx";
import { HashLink } from "react-router-hash-link";
import "./Home.css";
import "../App.css";

function Home() {
  return (
    <>
      <section className="herosection">
        <h1>Pizzaurant</h1>
        <HashLink className="menulink" smooth to={"#menuID"}>
          <h2>Check out our menu!</h2>
        </HashLink>
      </section>
      <Menu />
    </>
  );
}

export default Home;
