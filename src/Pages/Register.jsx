import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import {
  MdBloodtype,
  MdEmail,
  MdLocationOn,
  MdLock,
  MdMap,
  MdPerson,
  MdPhotoCamera,
} from "react-icons/md";

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpozilas] = useState([]);
  const [upazila, setUpozila] = useState("");

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts))
      .catch((err) => console.log(err));

    axios
      .get("/upazila.json")
      .then((res) => setUpozilas(res.data.upazilas))
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const photo = form.photo;
    const file = photo.files[0];
    const blood = form.blood.value;

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must have an uppercase, lowercase & at least 6 characters",
      });
    }

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=4951fc09b999088ad5352346f9bd8bec`,
        { image: file },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const mainPhotoUrl = res.data.data.display_url;
      const formData = {
        name,
        email,
        password,
        mainPhotoUrl,
        blood,
        district,
        upazila,
      };

      if (res.data.success) {
        createUser(email, password).then((result) => {
          const user = result.user;
          updateUser({ displayName: name, photoURL: mainPhotoUrl }).then(() => {
            Swal.fire({
              icon: "success",
              title: "Account Created Successfully!",
              timer: 1500,
              showConfirmButton: false,
            });
            setUser({ ...user, displayName: name, photoURL: mainPhotoUrl });
            axios.post(
              "https://blood-donation-xi-one.vercel.app/users",
              formData
            );
            navigate(location.state ? location.state : "/");
          });
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  const handleTogglePass = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPass = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-[#fdf2f2] flex justify-center items-center p-6">
      <div className="card bg-white w-full max-w-2xl shadow-2xl border-t-4 border-red-600 rounded-2xl overflow-hidden">
        <div className="bg-red-50 py-6 flex flex-col items-center border-b border-red-100">
          <div className="bg-red-600 p-3 rounded-full shadow-lg animate-pulse mb-2">
            <MdBloodtype className="text-white text-5xl" />
          </div>
          <h2 className="font-bold text-4xl text-red-700">Join BloodCare</h2>
          <p className="text-gray-500 text-sm">
            Create an account to save lives
          </p>
        </div>

        <form onSubmit={handleRegister} className="card-body p-8">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">Full Name</label>
              <div className="relative flex items-center">
                <MdPerson className="absolute left-4 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full pl-12 bg-gray-50"
                  placeholder="John Doe"
                  required
                />
              </div>
              {nameError && (
                <p className="text-red-500 text-xs mt-1">{nameError}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Email Address
              </label>
              <div className="relative flex items-center">
                <MdEmail className="absolute left-4 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full pl-12 bg-gray-50"
                  placeholder="example@mail.com"
                  required
                />
              </div>
            </div>

            {/* Photo */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Profile Photo
              </label>
              <div className="relative flex items-center">
                <MdPhotoCamera className="absolute left-4 text-gray-400" />
                <input
                  name="photo"
                  type="file"
                  className="file-input file-input-bordered w-full pl-12 bg-gray-50 h-12"
                  required
                />
              </div>
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Blood Group
              </label>
              <select
                name="blood"
                className="select select-bordered w-full bg-gray-50"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">District</label>
              <div className="relative flex items-center">
                <MdMap className="absolute left-4 text-gray-400" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="select select-bordered w-full pl-12 bg-gray-50"
                  required
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {districts.map((d) => (
                    <option key={d.id} value={d?.name}>
                      {d?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upazila */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">Upazila</label>
              <div className="relative flex items-center">
                <MdLocationOn className="absolute left-4 text-gray-400" />
                <select
                  value={upazila}
                  onChange={(e) => setUpozila(e.target.value)}
                  className="select select-bordered w-full pl-12 bg-gray-50"
                  required
                >
                  <option value="" disabled>
                    Select Upazila
                  </option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u?.name}>
                      {u?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">Password</label>
              <div className="relative flex items-center">
                <MdLock className="absolute left-4 text-gray-400 z-10" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 bg-gray-50 z-0"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePass}
                  className="absolute right-4 text-gray-500 z-20 p-1"
                >
                  {showPassword ? (
                    <IoIosEyeOff size={20} />
                  ) : (
                    <IoIosEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (NEW FIELD) */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <MdLock className="absolute left-4 text-gray-400 z-10" />
                <input
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 bg-gray-50 z-0"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={handleToggleConfirmPass}
                  className="absolute right-4 text-gray-500 z-20 p-1"
                >
                  {showConfirmPassword ? (
                    <IoIosEyeOff size={20} />
                  ) : (
                    <IoIosEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </fieldset>
          {/* Register Button */}
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 border-none text-white w-full mt-8 h-12 rounded-xl whitespace-nowrap text-lg font-bold shadow-lg text-ellipsis shadow-red-200"
          >
            Create Account
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
