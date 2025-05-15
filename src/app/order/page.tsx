"use client";
import { IOrder } from "@/types/orderTypes";
import React, { useEffect, useState } from "react";

const OrdersDashboard = () => {
  const [orders, setOrder] = useState<IOrder[] | []>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

  const fetchOrder = async () => {
    const res = await fetch(`/api/order`, {
      method: "GET",
    });
    const { data } = await res.json();
    setOrder(data);
  };

  const handleEdit = (orderId: string) => {
    setEditingOrderId(orderId);
  };

  const updateOrder = async (order: IOrder) => {
    try {
      const res = await fetch(`/api/order/${order._id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: order.status }),
      });
      if (res.ok) {
        fetchOrder();
        setEditingOrderId(null);
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-sm text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">UpdatedAt</th>
              <th className="px-4 py-3">Status update</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order: IOrder, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono">{order.orderNumber}</td>
                <td className="px-4 py-2">
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-gray-500 text-xs">
                    {order.customer.phone}
                  </div>
                </td>
                <td className="px-4 py-2">{order.area}</td>
                <td className="px-4 py-2">₹{order.totalAmount}</td>
                <td className="px-4 py-2">
                  {editingOrderId === order._id?.toString() ? (
                    <div className="flex items-center space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as
                            | "picked"
                            | "delivered";
                          order.status = newStatus;
                        }}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="picked">Picked</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      <button
                        className="bg-green-500 text-white rounded px-3 py-1 text-sm"
                        onClick={() => {
                          updateOrder(order)
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-red-500 text-white rounded px-3 py-1 text-sm"
                        onClick={() => setEditingOrderId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "assigned"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-xs">
                  {order.assignedTo ? (
                    order.assignedTo
                  ) : (
                    <span className="italic text-gray-400">Not Assigned</span>
                  )}
                </td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {order.updatedAt
                    ? new Date(order.updatedAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-400 text-white rounded-2xl px-4 py-2 text-md"
                    onClick={() => handleEdit(order._id?.toString() || "")}
                  >
                    Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center text-sm py-6 text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
