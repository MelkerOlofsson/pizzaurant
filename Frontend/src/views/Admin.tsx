import PostFormComponent from "../components/PostFormComponent";
import DeleteFormComponent from "../components/DeleteFormComponent";
import PutFormComponent from "../components/PutFormComponent";
import "./Admin.css";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";

function Admin() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <>
      {isLoggedIn === true && (
        <section className="adminsection">
          <h1 className="admin">ADMIN SETTINGS</h1>
          <PostFormComponent />
          <hr className="adminseparator" />
          <DeleteFormComponent />
          <hr className="adminseparator" />
          <PutFormComponent />
        </section>
      )}
      {isLoggedIn === false && (
        <h2 className="noaccess">You do not have permission</h2>
      )}
    </>
  );
}

export default Admin;
