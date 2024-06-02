import "./SignUp.css";
import { useState } from "react";

interface signUpForm {
  email: string;
  password: string;
  repeat: string;
}

function SignUp() {
  const [signUpForm, setSignUpForm] = useState<signUpForm>({
    email: "",
    password: "",
    repeat: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const changedInput = e.target.id;
    if (changedInput === "emailsignup") {
      setSignUpForm((prevState) => ({
        ...prevState,
        email: e.target.value,
      }));
    } else if (changedInput === "passwordsignup") {
      setSignUpForm((prevState) => ({
        ...prevState,
        password: e.target.value,
      }));
    } else {
      setSignUpForm((prevState) => ({
        ...prevState,
        repeat: e.target.value,
      }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (signUpForm.password === signUpForm.repeat) {
      fetch("/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });
    }
  }

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <label htmlFor="emailsignup">Email</label>
        <input
          type="email"
          name="email"
          id="emailsignup"
          onChange={handleInputChange}
        />
        <label htmlFor="passwordsignup">Set Password</label>
        <input
          type="password"
          name=""
          id="passwordsignup"
          onChange={handleInputChange}
        />
        <label htmlFor="repeatsignup">Confirm Password</label>
        <input
          type="password"
          name=""
          id="repeatsignup"
          onChange={handleInputChange}
        />
        <input type="submit" value="Create Account" />
      </form>
    </>
  );
}

export default SignUp;
