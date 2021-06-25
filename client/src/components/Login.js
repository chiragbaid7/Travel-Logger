import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const history = useHistory();

  const [error, Seterror] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const a = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const response = await a.json();
      if (response.name === "Error") {
        Seterror(response.message);
      } else {
        history.push("/TravelLog");
      }
    } catch (error) {
      Seterror(error);
    }
  };
  return (
    <div className="modal">
      <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
        {error && <h1>{error}</h1>}
        <label>Email</label>
        <input
          type="text"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        <label>Password</label>
        <input
          type="text"
          {...register("password", {
            required: true,
          })}
        />
        <Link to="/Signin">Signin</Link>
        <input type="submit" />
      </form>
    </div>
  );
}
export default Login;
