import { useState } from "react";
import type { LoginData } from "../api/types";
import { login } from "../api/requests";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { validate } = useAuth({ setEmailErrorMessage, setPasswordErrorMessage });
  const navigate = useNavigate();
  const isDisabled = email === "" || password === "" || isLoading;

  const onLogin = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    const isValid = validate(email, password);
    if (!isValid) return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoading(true);
    const payload: LoginData = {
      email,
      password,
    };
    try {
      const data = await login(payload);
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      navigate("/");
    } catch (err) {
      let message = "Login failed. Please try again.";

      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "object" && err !== null) {
        const anyErr = err as any;
        message = anyErr?.response?.data?.message ?? message;
      }
      console.error("Login error details:", err);
      if (message === "Wrong Credentials") {
        setPasswordErrorMessage("Wrong password");
      } else if (message === "User with this email do not exist") {
        setEmailErrorMessage("User with this email does not exist");
      } else {
        setEmailErrorMessage("Login failed. Please try again.");
      }
      setIsLoading(false);
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const card = e.currentTarget;
    const x = e.pageX - card.offsetLeft;
    const y = e.pageY - card.offsetTop;
    setPosition({ x, y });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={onLogin}
        style={
          {
            "--x": `${position.x}px`,
            "--y": `${position.y}px`,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        className="w-150 h-150  flex flex-col justify-evenly items-center rounded-3xl radial-overlay border border-cyan-800  "
      >
        <div className="text-5xl font-raleway ">Login</div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-2xl font-raleway ">
            Email
          </label>

          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#5d7e96] w-100 p-4 rounded-full focus:outline-black focus:outline-3 text-white"
            disabled={isLoading}
          />
          {emailErrorMessage !== "" && <span className="text-red-500">{emailErrorMessage}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-2xl font-raleway ">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#5d7e96] w-100 p-4 rounded-full focus:outline-black focus:outline-3 text-white"
            disabled={isLoading}
          />
          {passwordErrorMessage !== "" && (
            <span className="text-red-500">{passwordErrorMessage}</span>
          )}
        </div>
        <button
          disabled={isDisabled}
          className="text-2xl font-raleway bg-cyan-950/80 text-white w-50 p-2 rounded-full cursor-pointer"
        >
          Submit
        </button>
        <div className="text-2xl flex flex-col font-raleway text-black/50">
          Dont have an account?{" "}
          <Link to="/register" className="text-cyan-800 ">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
