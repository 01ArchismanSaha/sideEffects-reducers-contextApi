import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, actions) => {
  if (actions.type === "USER_INPUT") {
    return { value: actions.val, isValid: actions.val.includes("@") };
  }
  if (actions.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, actions) => {
  if (actions.type === "USER_INPUT") {
    return { value: actions.val, isValid: actions.val.trim().length > 6 };
  }
  if (actions.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeReducer = (state, actions) => {
  if (actions.type === "USER_INPUT") {
    return { value: actions.val, isValid: actions.val.trim().length > 0 };
  }
  if (actions.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState("");
  // const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegeIsValid } = collegeState;

  useEffect(() => {
    // console.log('EFFECT RAN')
    const timer = setTimeout(() => {
      console.log("checking validity");
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid);
    }, 500);

    return () => {
      console.log("CLEAN UP RAN");
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordState.isValid &&
    //     enteredCollege.trim().length > 0
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     enteredCollege.trim().length > 0
    // );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     event.target.value.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
