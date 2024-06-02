import { useState, useContext } from "react";
import "./SignIn.css";
import LoginContext from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

interface signInForm {
  email: string;
  password: string;
}

function SignIn() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);
  const [signInForm, setSignInForm] = useState<signInForm>({
    email: "",
    password: "",
  });

  function signedIn() {
    fetch("/verify-token", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(signInForm),
    })
      .then((response) => {
        response.json;
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .then(signedIn)
      .catch((err) => {
        console.error(err);
        alert("Failed to sign in");
      });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const changedInput = e.target.id;
    if (changedInput === "emailsignin") {
      setSignInForm((prevState) => ({
        ...prevState,
        email: e.target.value,
      }));
    } else {
      setSignInForm((prevState) => ({
        ...prevState,
        password: e.target.value,
      }));
    }
  }

  return (
    <>
      <form className="signin" onSubmit={handleSubmit}>
        <label htmlFor="emailsignin">Email</label>
        <input
          type="email"
          name="email"
          id="emailsignin"
          onChange={handleInputChange}
        />
        <label htmlFor="passwordsignin">Password:</label>
        <input
          type="password"
          name="password"
          id="passwordsignin"
          onChange={handleInputChange}
        />
        <input type="submit" value="Log In" />
      </form>
    </>
  );
}

export default SignIn;
