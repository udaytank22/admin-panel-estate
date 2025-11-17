import React, { useState } from "react";
import { images } from "../../assets/images";
import CustomInput from "../../component/input";
import PrimaryButton from "../../component/PrimaryButton";
import { strings } from "../../utils/strings/strings";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  apiPost,
  saveAuthToken,
  saveRefreshToken,
} from "../../services/apiclient/apiClient";
import { API_ENDPOINTS } from "../../services/apiclient/apiEndpoints";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await apiPost(API_ENDPOINTS.AUTH.EMAIL_LOGIN, {
        email,
        password,
      });

      saveAuthToken(res.data.access);
      saveRefreshToken(res.data.refresh);

      sessionStorage.setItem("userInfo", JSON.stringify(res.data.user));

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("API Login Error:", err);

      const msg =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Invalid email or password";

      toast.error(msg);
    }
  };

  return (
    <div className="flex h-screen overflow-y-auto bg-white">
      {/* LEFT PANEL */}
      <div className="w-[720px] min-w-[720px] px-[100px] py-[80px] relative">
        <img
          src={images.logo}
          alt="Estate Facility Logo"
          className="w-28 h-auto mb-10"
        />

        <div className="w-[440px] mb-10">
          <h1 className="text-[#034175] text-3xl font-bold">
            {strings.loginTitle}
          </h1>
          <p className="text-gray-600 text-base leading-7 mt-3">
            {strings.loginDescription}
          </p>
        </div>

        <div className="w-[440px] flex flex-col gap-7">
          <CustomInput
            label="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
            }}
            placeholder="john@gmail.com"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((p) => ({ ...p, password: "" }));
            }}
            placeholder="Enter your password"
            secure={true}
            error={errors.password}
          />

          <PrimaryButton
            title="Login"
            isError={errors.email === "" || errors.password === ""}
            onClick={handleLogin}
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 relative bg-sky-400 overflow-hidden">
        <img
          src={images.rightGradient}
          alt="Decorative gradient"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Login;
