import { useState } from "react";
import SignIn from "../components/SignIn.tsx";
import SignUp from "../components/SignUp.tsx";
import "./Login.css";

function Login() {
  const [noAccount, setNoAccount] = useState<boolean>(false);

  function handleAccountClick() {
    setNoAccount(noAccount === true ? false : true);
  }

  return (
    <>
      <section className="logincontainer">
        {noAccount === false && (
          <>
            <SignIn />
            <h3 className="signinorsignup" onClick={handleAccountClick}>
              Don't have an account? Register here!
            </h3>
          </>
        )}
        {noAccount === true && (
          <>
            <SignUp />
            <h3 className="signinorsignup" onClick={handleAccountClick}>
              Already have an account? Login here!
            </h3>
          </>
        )}
      </section>
    </>
  );
}

export default Login;
