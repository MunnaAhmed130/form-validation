import { useEffect } from "react";
import { useState, useRef } from "react";
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";

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
    // setValidName(USER_REGEX.text(user));
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    // setValidPwd(PWD_REGEX.text(pwd));
    // setValidMatch(pwd === matchPwd);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrorMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.text(user);
    const v2 = PWD_REGEX.text(pwd);
    if (!v1 || !v2) {
      setErrorMsg("invalid Entry");
      return;
    }
  };
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
      <form className="flex flex-col  flex-grow pb-4" onSubmit={handleSubmit}>
        <label htmlFor="username" className="mt-4 inline-block">
          UserName:
          <span
            className={
              validName ? "text-[limegreen] ml-1 inline-block" : "hidden"
            }
          >
            <FaCheck />
          </span>
          <span
            className={
              validName || !user
                ? "hidden"
                : "text-orange-700 ml-1 inline-block"
            }
          >
            <FaTimes />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          className="text-xl p-1 rounded-lg text-black"
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
              ? "text-xs rounded-lg bg-black text-white relative -bottom-3 p-1"
              : "absolute left-[-9999px]"
          }
        >
          <FaInfoCircle className="inline-block mr-1" />
          4 to 24 characters. <br />
          Must begin with a letter <br />
          Letter, number, underscores, heyphens allowed.
        </p>
        <label htmlFor="password" className="mt-4 inline-block">
          password:
          <span
            className={
              validPwd ? "text-[limegreen] ml-1 inline-block" : "hidden"
            }
          >
            <FaCheck />
          </span>
          <span
            className={
              validPwd || !pwd ? "hidden" : "text-orange-700 ml-1 inline-block"
            }
          >
            <FaTimes />
          </span>
        </label>
        <input
          type="password"
          id="password"
          className="text-xl p-1 rounded-lg text-black"
          onChange={(e) => setPwd(e.target.value)}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          required
        />
        <p
          id="pwdnote"
          className={
            pwdFocus && !validPwd
              ? "text-xs rounded-lg bg-black text-white relative -bottom-3 p-1"
              : "absolute left-[-9999px]"
          }
        >
          <FaInfoCircle className="inline-block mr-1" />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character. <br />
          Special characters allowed:
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_password" className="mt-4 inline-block">
          Confirm Password:
          <span
            className={
              validMatch && matchPwd
                ? "text-[limegreen] ml-1 inline-block"
                : "hidden"
            }
          >
            <FaCheck />
          </span>
          <span
            className={
              validMatch || !matchPwd
                ? "hidden"
                : "text-orange-700 ml-1 inline-block"
            }
          >
            <FaTimes />
          </span>
        </label>
        <input
          type="password"
          id="confirm_password"
          className="text-xl p-1 rounded-lg text-black"
          onChange={(e) => setMatchPwd(e.target.value)}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          required
        />
        <p
          id="pwdnote"
          className={
            matchFocus && !validMatch
              ? "text-xs rounded-lg bg-black text-white relative -bottom-3 p-1"
              : "absolute left-[-9999px]"
          }
        >
          <FaInfoCircle className="inline-block mr-1" />
          Must match the first password input field
        </p>

        <button
          className="text-xl p-2 rounded-lg bg-gray-300 mt-6 text-black"
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="inline-block">
          {/*put router link here*/}
          <a href="#">Sign In</a>
        </span>
      </p>
    </section>
  );
};

export default Register;
