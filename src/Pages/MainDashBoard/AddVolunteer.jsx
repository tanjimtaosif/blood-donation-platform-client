import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { initializeApp, deleteApp, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
const AddVolunteer = () => {
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpozilas] = useState([]);
  const [upazila, setUpozila] = useState("");
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => {
        setDistricts(res.data.districts);
      })
      .catch((err) => console.log(err));

    axios
      .get("/upazila.json")
      .then((res) => {
        setUpozilas(res.data.upazilas);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    const photo = form.photo;
    const email = form.email.value.trim();
    const password = form.password.value;
    const file = photo.files[0];
    // console.log(file);
    const blood = form.blood.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must have an uppercase, lowercase & at least 6 characters",
      });
    }
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=4951fc09b999088ad5352346f9bd8bec`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
      role: "volunteer",
      status: "active",
    };

    if (res.data.success == true) {
      try {
        let secondaryApp;
        try {
          secondaryApp = getApp("Secondary");
        } catch (e) {
          secondaryApp = initializeApp(app.options, "Secondary");
        }
        const secondaryAuth = getAuth(secondaryApp);
        const result = await createUserWithEmailAndPassword(
          secondaryAuth,
          email,
          password
        );
        const newVolunteer = result.user;
        await updateProfile(newVolunteer, {
          displayName: name,
          photoURL: mainPhotoUrl,
        });
        const dbResponse = await axios.post(
          "https://blood-donation-xi-one.vercel.app/users",
          formData
        );
        console.log(dbResponse.data);
        await signOut(secondaryAuth);
        await deleteApp(secondaryApp);
        Swal.fire({
          icon: "success",
          title: "Volunteer Added Successfully!",
          text: "New volunteer can now login with their credentials.",
          timer: 2000,
          showConfirmButton: false,
        });
        form.reset();
        setDistrict("");
        setUpozila("");
      } catch (error) {
        console.error("Error adding volunteer:", error);
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text: error.message,
        });
      }
    }
  };

  const handleTogglePass = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-4">
        <h2 className="font-semibold text-2xl text-center">Add Volunteer</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="space-y-2">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Photo URL */}
              <div>
                <label className="label">Photo URL</label>
                <input
                  name="photo"
                  type="file"
                  className="input"
                  placeholder="Photo URL"
                  required
                />
              </div>
              {/* choose a blood*/}
              <div>
                <label className="label">Blood Group</label>
                <select name="blood" defaultValue="" className="select ">
                  <option value="" disabled={true}>
                    Select blood group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* districts */}
              <div>
                <label className="label">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="select"
                >
                  <option value="" disabled>
                    Select Your District
                  </option>
                  {districts.map((d) => (
                    <option value={d?.name} key={d.id}>
                      {d?.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* upazila */}
              <div>
                <label className="label">Upazila</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpozila(e.target.value)}
                  className="select"
                >
                  <option value="" disabled>
                    Select Your Upazila
                  </option>
                  {upazilas.map((u) => (
                    <option value={u?.name} key={u.id}>
                      {u?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative w-full flex items-center">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={handleTogglePass}
                className="absolute right-4 z-10 p-1 flex items-center justify-center"
              >
                {showPassword ? (
                  <IoIosEyeOff className="text-2xl text-gray-500" />
                ) : (
                  <IoIosEye className="text-2xl text-gray-500" />
                )}
              </button>
            </div>

            {/* AddVolunteer Button */}
            <button
              type="submit"
              className="btn bg-red-600 text-white mt-4 w-full"
            >
              Add Volunteer
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddVolunteer;
