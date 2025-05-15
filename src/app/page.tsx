"use client";
import React, { useEffect, useState } from "react";
import { IPartner } from "@/types/partnerTypes";
import { IOrder } from "@/types/orderTypes";
import { useRouter } from "next/navigation";
import Assignment from "@/component/page";

const Dashboard = () => {
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [editedPartner, setEditedPartner] = useState<Partial<IPartner>>({});
  const router = useRouter();

  const fetchPartners = async () => {
    try {
      const response = await fetch("/api/partner", {
        method: "GET",
      });
      const data = await response.json();
      setPartners(data.data);
      console.log("Partners:", data.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "GET",
      });
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.log("Error fetching Orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
    fetchPartners();
  }, []);

  const handleDelete = async (partner: IPartner) => {
    try {
      const response = await fetch(`/api/partner/${partner._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchPartners();
      } else {
        console.log("failed to Delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (partner: IPartner) => {
    setEditingPartnerId(partner._id?.toString() || null);
    setEditedPartner({ ...partner });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof IPartner
  ) => {
    setEditedPartner({ ...editedPartner, [field]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/partner/${editingPartnerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPartner),
      });
      if (response.ok) {
        fetchPartners();
        setEditingPartnerId(null);
        setEditedPartner({});
      } else {
        console.error("Failed to update partner");
      }
    } catch (error) {
      console.error("Error saving partner:", error);
    }
  };

  const activePartnersCount = partners.filter(
    (partner) => partner.status === "active"
  ).length;

  const totalOrder = orders.length;

  return (
    <div className="p-6 bg-red-100 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={()=> router.push("/partner/registration")}>
            Partner Registration
          </button>
          <button
            onClick={() => router.push("/order")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Order
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          onClick={()=> router.push("/")}>
            Assignment Metric
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrder}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Active Partners</h2>
          <p className="text-2xl font-bold">{activePartnersCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Completed Assignments</h2>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Orders Map</h2>
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <table>
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Partner Availability</h2>
        <div className="min-h-60 overflow-y-scroll w-full">
          <table className="table-fixed w-full border-collapse">
            <thead className="sticky top-0 bg-gray-200 z-10">
              <tr>
                <th className="w-10 px-4 py-2 text-left">No.</th>
                <th className="w-32 px-4 py-2 text-left">Name</th>
                <th className="w-48 px-4 py-2 text-left">Email</th>
                <th className="w-30 px-4 py-2 text-left">Phone</th>
                <th className="w-20 px-4 py-2 text-left">Status</th>
                <th className="w-30 px-4 py-2 text-left">Current Load</th>
                <th className="w-30 px-4 py-2 text-left">Area</th>
                <th className="w-30 px-4 py-2 text-left">Shift</th>
                <th className="w-30 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner, index) => {
                const isEditing = editingPartnerId === partner._id?.toString();

                return isEditing ? (
                  <tr key={index} className="bg-yellow-50 w-full">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editedPartner.name || ""}
                        onChange={(e) => handleInputChange(e, "name")}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="email"
                        value={editedPartner.email || ""}
                        onChange={(e) => handleInputChange(e, "email")}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editedPartner.phone || ""}
                        onChange={(e) => handleInputChange(e, "phone")}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editedPartner.status || ""}
                        onChange={(e) => handleInputChange(e, "status")}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={editedPartner.currentLoad ?? ""}
                        onChange={(e) => handleInputChange(e, "currentLoad")}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={editedPartner.areas || ""}
                        onChange={(e) => handleInputChange(e, "areas")}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <input
                          type="time"
                          placeholder="Start"
                          value={editedPartner.shift?.start || ""}
                          onChange={(e) =>
                            setEditedPartner({
                              ...editedPartner,
                              shift: {
                                end: editedPartner.shift?.end ?? "",
                                start: e.target.value,
                              },
                            })
                          }
                          className="border p-1 rounded w-1/2"
                        />
                        <input
                          type="time"
                          placeholder="End"
                          value={editedPartner.shift?.end || ""}
                          onChange={(e) =>
                            setEditedPartner({
                              ...editedPartner,
                              shift: {
                                start: editedPartner.shift?.start ?? "",
                                end: e.target.value,
                              },
                            })
                          }
                          className="border p-1 rounded w-1/2"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 space-x-4">
                      <button
                        className="text-green-600 rounded-2xl hover:bg-green-300 px-4 py-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-600 rounded-2xl hover:bg-red-300 px-4 py-2"
                        onClick={() => {
                          setEditingPartnerId(null);
                          setEditedPartner({});
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 truncate">{partner.name}</td>
                    <td className="px-4 py-2 truncate">{partner.email}</td>
                    <td className="px-4 py-2">{partner.phone}</td>
                    <td className="px-4 py-2">{partner.status}</td>
                    <td className="px-4 py-2">{partner.currentLoad}</td>
                    <td className="px-4 py-2 truncate">{partner.areas}</td>
                    <td className="px-4 py-2 truncate">
                      {partner.shift?.start} - {partner.shift?.end}
                    </td>
                    <td className="px-4 py-2">
                      <div className="gap-2">
                        <button
                          className="text-blue-600 rounded-2xl hover:bg-green-200 px-4 py-2"
                          onClick={() => handleEdit(partner)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-blue-600 rounded-2xl hover:bg-red-200 px-4 py-2"
                          onClick={() => handleDelete(partner)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Assignments</h2>
       <Assignment/>
      </div>
    </div>
  );
};

export default Dashboard;
