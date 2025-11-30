import { useState } from "react";
import type { RegisterData } from "../api/types";
import { login, register } from "../api/requests";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "../stores/useUserStore";
import ImagePlaceholder from "../components/core/ImagePlaceholder";
const Register = () => {
  const { setUser } = useUserStore();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { validate } = useAuth({ setEmailErrorMessage, setPasswordErrorMessage });
  const navigate = useNavigate();
  const isDisabled = email === "" || password === "" || isLoading;

  const onRegister = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    const isValid = validate(email, password);
    if (!isValid) return;

    setIsLoading(true);

    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setNameErrorMessage("");
    const payload: RegisterData = {
      email,
      name,
      password,
      avatar: avatar || "https://i.pravatar.cc/300",
      role: "customer",
    };
    try {
      const createdUser = await register(payload as RegisterData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const loginResp = await login({ email, password });
      localStorage.setItem("accessToken", loginResp.access_token);
      localStorage.setItem("refreshToken", loginResp.refresh_token);
      setUser(createdUser);

      navigate("/");
      setIsLoading(false);
    } catch (err) {
      console.error(err);

      const anyErr = err as any;
      const status = anyErr?.response?.status;
      const apiMessage = anyErr?.response?.data?.message;
      if (status === 400 || status === 409) {
        setEmailErrorMessage(
          "This email is already registered. Please use a different email or login."
        );
      } else if (apiMessage) {

        if (typeof apiMessage === "string") {
          if (apiMessage.toLowerCase().includes("email")) {
            setEmailErrorMessage(apiMessage);
          } else if (apiMessage.toLowerCase().includes("password")) {
            setPasswordErrorMessage(apiMessage);
          } else if (apiMessage.toLowerCase().includes("name")) {
            setNameErrorMessage(apiMessage);
          } else {
            setEmailErrorMessage(apiMessage);
          }
        } else if (Array.isArray(apiMessage)) {
          apiMessage.forEach((msg: string) => {
            if (msg.toLowerCase().includes("email")) setEmailErrorMessage(msg);
            else if (msg.toLowerCase().includes("password")) setPasswordErrorMessage(msg);
            else if (msg.toLowerCase().includes("name")) setNameErrorMessage(msg);
          });
        }
      } else {
        setEmailErrorMessage("Registration failed. Please try again.");
      }
    } finally {
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
        onSubmit={onRegister}
        style={
          {
            "--x": `${position.x}px`,
            "--y": `${position.y}px`,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        className="w-240 h-180 flex flex-col justify-evenly items-center rounded-3xl radial-overlay border border-cyan-800"
      >
        <div className="text-6xl font-raleway ">Register</div>
        <div className="flex justify-around items-center w-full h-140">
          <div className="w-100 h-100">
            <ImagePlaceholder onImageUpload={(url) => setAvatar(url)} />
          </div>
          <div className="flex flex-col justify-evenly h-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-2xl font-raleway ">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#5d7e96] w-100 p-4 rounded-full focus:outline-black focus:outline-3 text-white"
                disabled={isLoading}
              />
              {nameErrorMessage !== "" && <span className="text-red-500">{nameErrorMessage}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-2xl font-raleway">
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
              {emailErrorMessage !== "" && (
                <span className="text-red-500">{emailErrorMessage}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-2xl font-raleway">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#5d7e96] w-100 p-4 rounded-full focus:outline-black focus:outline-3 text-white"
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
              Have an account?{" "}
              <Link to="/login" className="text-cyan-800">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
