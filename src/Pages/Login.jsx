import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { MdEmail, MdLock, MdBloodtype } from "react-icons/md";

const Login = () => {
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = use(AuthContext);
  const location = useLocation();
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "Login Successful",
          timer: 2000,
          showConfirmButton: false,
          color: "#b91c1c",
        });
        Navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
      });
  };

  const handleTogglePass = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-50"></div>

      <div className="card bg-white w-full max-w-md shadow-2xl border-t-4 border-red-600 rounded-2xl overflow-hidden z-10">
        <div className="bg-red-50 py-8 flex flex-col items-center gap-2">
          <div className="bg-red-600 p-3 rounded-full shadow-lg animate-pulse">
            <MdBloodtype className="text-white text-5xl" />
          </div>
          <h2 className="font-bold text-3xl text-red-700 tracking-tight mt-2">
            BloodCare
          </h2>
          <p className="text-red-500 text-sm font-medium uppercase tracking-widest">
            Login Your Account
          </p>
        </div>

        <form onSubmit={handleLogin} className="card-body p-8">
          <div className="space-y-5">
            {/* Email Field */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-gray-700">
                  Email Address
                </span>
              </label>
              <div className="relative flex items-center group">
                <MdEmail className="absolute left-4 text-gray-400 group-focus-within:text-red-600 transition-colors text-xl" />
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full pl-12 bg-gray-50 focus:bg-white focus:border-red-600 transition-all rounded-xl"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label py-1 flex justify-between">
                <span className="label-text font-bold text-gray-700">
                  Password
                </span>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-xs text-red-600 hover:underline"
                ></Link>
              </label>
              <div className="relative flex items-center group">
                <MdLock className="absolute left-4 text-gray-400 group-focus-within:text-red-600 transition-colors text-xl" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 bg-gray-50 focus:bg-white focus:border-red-600 transition-all rounded-xl"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePass}
                  className="absolute right-4 z-20 p-1 text-gray-400 hover:text-red-600 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <IoIosEyeOff size={22} />
                  ) : (
                    <IoIosEye size={22} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 italic">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn bg-red-600 hover:bg-red-700 border-none text-white w-full mt-4 h-12 rounded-xl shadow-lg shadow-red-200 transition-all transform hover:scale-[1.02] active:scale-95 text-lg font-bold"
            >
              Log In
            </button>
          </div>

          <div className="divider my-6 text-gray-400 text-sm italic">
            or continue with
          </div>

          <p className="text-center text-gray-600 text-sm">
            Ready to save lives?{" "}
            <Link
              to="/register"
              className="text-red-600 font-bold hover:underline transition-all"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
