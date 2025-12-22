import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../../Hooks/UseAxios";
import RequestCardDesign from "../../Components/RequestCardDesign";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpozilas] = useState([]);
  const [upazila, setUpozila] = useState("");
  const [requests, setRequests] = useState([]);
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();

 
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts))
      .catch(console.log);

    axios
      .get("/upazila.json")
      .then((res) => setUpozilas(res.data.upazilas))
      .catch(console.log);
  }, []);

 
  useEffect(() => {
    const blood = searchParams.get("blood") || "";
    const dist = searchParams.get("district") || "";
    const upz = searchParams.get("upazila") || "";

    setDistrict(dist);
    setUpozila(upz);

    if (blood) {
      axiosInstance
        .get(`/search-requests?blood=${blood}&district=${dist}&upazila=${upz}`)
        .then((res) => setRequests(res.data))
        .catch(console.log);
    }
  }, [searchParams, axiosInstance]);


  const handleSearch = (e) => {
    e.preventDefault();
    const blood = e.target.blood.value;
    axiosInstance
      .get(`/search-requests?blood=${blood}&district=${district}&upazila=${upazila}`)
      .then((res) => setRequests(res.data))
      .catch(console.log);
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl text-center py-5 text-red-500">
          ❤️ One Search Can Save a Life
        </h1>
      </div>

      <form onSubmit={handleSearch} className="fieldset flex gap-1 flex-wrap justify-center">
        <select name="blood" defaultValue="" className="select">
          <option value="" disabled>
            Select blood group
          </option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="select"
        >
          <option value="" disabled>
            Select Your District
          </option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>

        <select
          value={upazila}
          onChange={(e) => setUpozila(e.target.value)}
          className="select"
        >
          <option value="" disabled>
            Select Your Upazila
          </option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>

        <button className="btn bg-red-500">Search</button>
      </form>

      <div className="grid py-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCardDesign key={request._id} data={request} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No requests found. Please perform a search.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
