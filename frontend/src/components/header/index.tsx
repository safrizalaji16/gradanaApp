import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("Username");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push("/auth/login");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("username");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold leading-tight text-gray-900">
            Welcome on Board {capitalizeFirstLetter(username)}
          </h1>
          <button
            className="text-gray-900 hover:text-gray-700 text-lg focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
