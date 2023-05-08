import { useEffect } from "react";
import { useState, useRef } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section className="w-full max-w-md min-h-[400px] flex flex-col justify-start p-4 bg-blue-500">
      <p
        ref={errorRef}
        className={
          errorMsg
            ? "bg-orange-700 text-[firebrick] font-bold p-2 mb-2"
            : "absolute left-[-9999px]"
        }
        aria-live="assertive"
      >
        {errorMsg}
      </p>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">
          UserName:
          <span className={validName ? "text-[limegreen] ml-1" : "hidden"}>
            <FaCheck />
          </span>
          <span
            className={validName || !user ? "hidden" : "text-orange-700 ml-1"}
          >
            <FaTimes />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          required
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName
              ? "text-xs rounded-lg bg-white text-white relative -bottom-3"
              : "absolute left-[-9999px]"
          }
        >
          4 to 24 characters. <br />
          Must begin with a letter <br />
          Letter, number, underscores, heyphens allowed.
        </p>
      </form>
    </section>
  );
};

export default Register;
