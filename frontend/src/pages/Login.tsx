import React, { useState } from "react";
import { verifyOtp, sendOtp } from "../services/api";
import { useNavigate } from "react-router-dom";
import Bg from '../assets/bg.svg'
import { FadeLoader } from "react-spinners";
const Login: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await verifyOtp("user", email, otp); // name not needed for login
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-4">
        <div className="flex pb-5  gap-4">         <FadeLoader  color="blue" height={14} width={2}  margin={1} radius={0} />  
<h1 className="font-bold text-xl">HD</h1>
</div>
        <div className="px-10">
            <h1 className="text-3xl font-bold mb-2 max-sm:text-center">Sign In</h1>
          <p className="text-gray-500 mb-6 max-sm:text-center">Login to access your notes</p>

          {step === 1 && (
            <>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded mb-4"
              />

              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Get OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block text-sm mb-1">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded mb-4"
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Verify OTP & Login
              </button>
            </>
          )}

          <p className="mt-4 text-sm text-gray-600 max-sm:text-center">
            Don’t have an account?{" "}
            <a href="/" className="text-blue-600">Sign up</a>
          </p>
        </div>
        </div>

        <div className="hidden md:block w-1/2">
          <img src={Bg} alt="background" className="h-full w-full object-cover rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
