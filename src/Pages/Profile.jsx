import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import axios from "axios";

const IMGBB_API_KEY = "4951fc09b999088ad5352346f9bd8bec";

const Profile = () => {
  const { user, setUser, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
    axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));
  }, []);
  useEffect(() => {
    axiosSecure.get("/users/profile").then((res) => setProfile(res.data));
  }, [axiosSecure]);
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setProfile({ ...profile, mainPhotoUrl: data.data.url });
      } else {
        Swal.fire({ icon: "error", title: "Image Upload Failed" });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Image Upload Failed" });
    } finally {
      setUploading(false);
    }
  };
  const handleSave = async () => {
    try {
      await axiosSecure.patch("/users/profile", profile);

      if (updateUser) {
        await updateUser({
          displayName: profile.name,
          photoURL: profile.mainPhotoUrl,
        });
      }
      setUser({
        ...user,
        displayName: profile.name,
        photoURL: profile.mainPhotoUrl,
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile",
      });
    }
  };
  const disabled = !isEditing;
  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-4 md:p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profile?.mainPhotoUrl || user?.photoURL}
          alt="avatar"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border mb-2"
        />
        {isEditing && (
          <>
            <input
              type="file"
              onChange={handleImageChange}
              className="text-sm"
              accept="image/*"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            )}
          </>
        )}
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        User Profile
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            name="name"
            value={profile?.name || ""}
            onChange={handleChange}
            disabled={disabled}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            name="blood"
            value={profile?.blood || ""}
            onChange={handleChange}
            disabled={disabled}
            className="select select-bordered w-full"
          >
            <option value="">Select</option>
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

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            name="district"
            value={profile?.district || ""}
            onChange={handleChange}
            disabled={disabled}
            className="select w-full"
          >
            <option value="" disabled>
              Select Your District
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label">Upazila</label>
          <select
            name="upazila"
            value={profile?.upazila || ""}
            onChange={handleChange}
            disabled={disabled}
            className="select w-full"
          >
            <option value="" disabled>
              Select Your Upazila
            </option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Button */}
      <div className="text-center mt-6">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`btn btn-sm text-white ${
            isEditing ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
