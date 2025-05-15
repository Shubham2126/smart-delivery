"use client";
import React, { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  status: "active",
  areas: "",
  shift: {
    start: "",
    end: "",
  },
};
const PartnerRegistration = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if(name.includes(".")){
        const [parent, child] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as Record<string, string>),
        [child]: value,
      },
    }));
    }
    else{

      setFormData((prev) => ({
  ...prev,
  [name]: value,
}));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const res = await fetch(`/api/partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 201) {
      setPopupMessage("Registered Successfully!");
      setShowPopup(true);
       setFormData(initialFormData);
      setTimeout(() => {setShowPopup(false)}, 3000); 
    } else if (res.status === 400) {
      setPopupMessage("User already exists!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); 
    } else {
      console.error("Error:", res.statusText);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Partner Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Areas:</label>
            <input
              type="text"
              name="areas"
              value={formData.areas}
              onChange={handleChange}
              placeholder="Enter areas served"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Shift Start:
            </label>
            <input
              type="time"
              name="shift.start"
              value={formData.shift.start}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Shift End:</label>
            <input
              type="time"
              name="shift.end"
              value={formData.shift.end}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
      {showPopup && (
        <div
           style={{
            backgroundColor: `${popupMessage === "Registered Successfully!" ? "green" : "red"}`,
           }}
          className="fixed top-4 right-4 py-2 px-4 rounded shadow-md text-white"
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default PartnerRegistration;
