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
  const [upazilas, setUpazilas] = useState([]);
  const [upazila, setUpazila] = useState("");

  useEffect(() => {
    axios.get("/districts.json").then(res => setDistricts(res.data.districts));
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const file = form.photo.files[0];
    const blood = form.blood.value;

    if (name.length < 5) {
      return setNameError("Name should be more than 5 characters");
    } else {
      setNameError("");
    }

    if (password !== confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire(
        "Weak Password",
        "Password must contain uppercase, lowercase & minimum 6 characters",
        "error"
      );
    }

    try {
      const imgForm = new FormData();
      imgForm.append("image", file);

      const imgRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=4951fc09b999088ad5352346f9bd8bec",
        imgForm
      );

      const mainPhotoUrl = imgRes.data.data.display_url;

      const result = await createUser(email, password);

      await updateUser({
        displayName: name,
        photoURL: mainPhotoUrl,
      });

      await axios.post("https://blood-donation-xi-one.vercel.app/users", {
        name,
        email,
        blood,
        district,
        upazila,
        mainPhotoUrl,
      });

      setUser(result.user);

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    } catch (error) {
      let message = "Registration failed";

      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login.";
      }

      Swal.fire("Error", message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f2] flex justify-center items-center p-6">
      <div className="card bg-white w-full max-w-2xl shadow-2xl border-t-4 border-red-600 rounded-2xl overflow-hidden">
        <div className="bg-red-50 py-6 flex flex-col items-center border-b border-red-100">
          <div className="bg-red-600 p-3 rounded-full shadow-lg mb-2">
            <MdBloodtype className="text-white text-5xl" />
          </div>
          <h2 className="font-bold text-4xl text-red-700">Join BloodCare</h2>
          <p className="text-gray-500 text-sm">Create an account to save lives</p>
        </div>

        <form onSubmit={handleRegister} className="card-body p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          <input name="name" placeholder="Full Name" className="input input-bordered" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered" required />

          <input name="photo" type="file" className="file-input file-input-bordered" required />

          <select name="blood" className="select select-bordered" required>
            <option value="">Blood Group</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
          </select>

          <select value={district} onChange={e => setDistrict(e.target.value)} className="select select-bordered" required>
            <option value="">District</option>
            {districts.map(d => <option key={d.id}>{d.name}</option>)}
          </select>

          <select value={upazila} onChange={e => setUpazila(e.target.value)} className="select select-bordered" required>
            <option value="">Upazila</option>
            {upazilas.map(u => <option key={u.id}>{u.name}</option>)}
          </select>

          <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="input input-bordered" required />
          <input name="confirm_password" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="input input-bordered" required />

          <button className="btn bg-red-600 text-white col-span-full">Create Account</button>

          <p className="text-center col-span-full">
            Already have an account? <Link to="/login" className="text-red-600">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
