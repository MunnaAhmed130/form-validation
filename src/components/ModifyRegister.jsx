import { useEffect, useReducer, useRef, useState } from "react";
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ModifyRegister = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const initialState = {
    username: "",
    validName: false,
    focusName: false,
    password: "",
    validPassword: false,
    focusPassword: false,
    matchPassword: "",
    validMatch: false,
    focusMatch: false,
  };

  const actionTypes = {
    INPUT: "INPUT",
    PASSWORD: "PASSWORD",
    FOCUS: "FOCUS",
    MATCH: "MATCH",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.INPUT:
        return {
          ...state,
          [action.payload.name]: action.payload.value,
          [action.payload.valid]: action.payload.regex.test(
            action.payload.value
          ),
        };
      case actionTypes.PASSWORD:
        return {
          ...state,
          [action.payload.name]: action.payload.value,
          [action.payload.valid]: action.payload.regex.test(
            action.payload.value
          ),
          validMatch: action.payload.value === state.matchPassword,
        };
      case actionTypes.MATCH:
        return {
          ...state,
          [action.payload.name]: action.payload.value,
          [action.payload.valid]: state.password === action.payload.value,
        };
      case actionTypes.FOCUS:
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.password, state.matchPassword);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // onLoad focus on username input
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [state.username, state.password, state.matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(state.username);
    const v2 = PWD_REGEX.test(state.password);
    const v3 = state.password === state.matchPassword;
    if (!v1 || !v2 || !v3) {
      setErrorMsg("invalid Entry");
      return;
    }
    // console.log(state.user, state.password);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
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
          <h1 className="text-2xl text-center font-semibold uppercase">
            Register
          </h1>
          <form
            className="flex flex-col  flex-grow pb-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="username" className="mt-4 inline-block">
              Username:
              <span
                className={
                  state.validName
                    ? "text-[limegreen] ml-1 inline-block"
                    : "hidden"
                }
              >
                <FaCheck />
              </span>
              <span
                className={
                  state.validName || !state.username
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
              name="username"
              ref={userRef}
              className="text-xl py-1 px-2 rounded-lg text-black focus-visible:outline-none"
              autoComplete="off"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.INPUT,
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    regex: USER_REGEX,
                    valid: "validName",
                  },
                })
              }
              aria-invalid={state.validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() =>
                dispatch({
                  type: actionTypes.FOCUS,
                  payload: {
                    name: "focusName",
                    value: true,
                  },
                })
              }
              onBlur={() =>
                dispatch({
                  type: actionTypes.FOCUS,
                  payload: {
                    name: "focusName",
                    value: false,
                  },
                })
              }
              required
            />
            <p
              id="uidnote"
              className={
                state.focusName && state.username && !state.validName
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
                  state.validPassword
                    ? "text-[limegreen] ml-1 inline-block"
                    : "hidden"
                }
              >
                <FaCheck />
              </span>
              <span
                className={
                  state.validPassword || !state.password
                    ? "hidden"
                    : "text-orange-700 ml-1 inline-block"
                }
              >
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="text-xl p-1 rounded-lg text-black"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.PASSWORD,
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    regex: PWD_REGEX,
                    valid: "validPassword",
                  },
                })
              }
              aria-invalid={state.validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() =>
                dispatch({
                  type: actionTypes.FOCUS,
                  payload: {
                    name: "focusPassword",
                    value: true,
                  },
                })
              }
              onBlur={() =>
                dispatch({
                  type: actionTypes.FOCUS,
                  payload: {
                    name: "focusPassword",
                    value: false,
                  },
                })
              }
              required
            />
            <p
              id="pwdnote"
              className={
                state.FocusPassword && !state.validPassword
                  ? "text-xs rounded-lg bg-black text-white relative -bottom-3 p-1"
                  : "absolute left-[-9999px]"
              }
            >
              <FaInfoCircle className="inline-block mr-1" />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
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
                  state.validMatch && state.matchPassword
                    ? "text-[limegreen] ml-1 inline-block"
                    : "hidden"
                }
              >
                <FaCheck />
              </span>
              <span
                className={
                  state.validMatch || !state.matchPassword
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
              name="matchPassword"
              className="text-xl p-1 rounded-lg text-black"
              onChange={(e) =>
                dispatch({
                  type: actionTypes.MATCH,
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    valid: "validMatch",
                  },
                })
              }
              aria-invalid={state.validPassword ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() =>
                dispatch({
                  type: actionTypes.FOCUS,
                  payload: {
                    name: "focusMatch",
                    value: true,
                  },
                })
              }
              onBlur={() =>
                dispatch({
                  type: actionTypes.FOCUS,
                  payload: {
                    name: "focusMatch",
                    value: false,
                  },
                })
              }
              required
            />
            <p
              id="confirmnote"
              className={
                state.focusMatch && !state.validMatch
                  ? "text-xs rounded-lg bg-black text-white relative -bottom-3 p-1"
                  : "absolute left-[-9999px]"
              }
            >
              <FaInfoCircle className="inline-block mr-1" />
              Must match the first password input field
            </p>

            <button
              className="text-xl p-2 rounded-lg bg-gray-300 mt-6 text-black"
              // disabled={
              //   !state.validName || !state.validPassword || !state.validMatch
              //     ? true
              //     : false
              // }
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
      )}
    </>
  );
};

export default ModifyRegister;
