"use client";
import React, { useState } from "react";
import { IOrder } from "@/types/orderTypes";

const initialFormData = {
  orderNumber: "",
  customer: {
    name: "",
    address: "",
    phone: "",
  },
  area: "",
  items: [
    {
      name: "",
      quantity: "",
      price: "",
    },
  ],
  status: "pending",
  scheduledFor: "",
  totalAmount: 0,
};

const OrderCreation = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof IOrder["items"][number],
    value: string
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    const total = updatedItems.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0
    );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: total,
    }));
  };

  const addItem = () => {
    const updatedItems = [
      ...formData.items,
      { name: "", quantity: "1", price: "0" },
    ];
    const total = updatedItems.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.price),
      0
    );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: total,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uniqueOrderNumber = `ORD-${Date.now()}`;
    const updatedFormData = { ...formData, orderNumber: uniqueOrderNumber };

    const res = await fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    });
    if (res.status === 201) {
      const { data } = await res.json();
      setPopupMessage("Order Created Successfully!");
      handleAssign(data);
      setShowPopup(true);
      setFormData(initialFormData);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setPopupMessage("Error creating order!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleAssign = async (order: IOrder) => {
    try {
      const res = await fetch(`/api/order/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: order._id }),
      });
      const response = await res.json();
      console.log(response);

      if (res.ok) {
      } else {
        console.log("Failed to assign order", res);
      }
    } catch (error) {
      console.log("Failed to assign partner", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Order Creation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name:
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customer.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customer: { ...prev.customer, name: e.target.value },
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Address:
            </label>
            <input
              type="text"
              name="customerAddress"
              value={formData.customer.address}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customer: { ...prev.customer, address: e.target.value },
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Phone:
            </label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customer.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customer: { ...prev.customer, phone: e.target.value },
                }))
              }
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Area:</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Scheduled For:
            </label>
            <input
              type="date"
              name="scheduledFor"
              value={formData.scheduledFor}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Items:</label>
            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="w-1/4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  className="w-1/4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="text-blue-500 hover:underline"
            >
              + Add Item
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Amount:
            </label>
            <input
              type="number"
              disabled
              name="totalAmount"
              value={formData.totalAmount}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Order
          </button>
        </form>
      </div>
      {showPopup && (
        <div
          className="fixed top-4 right-4 py-2 px-4 rounded shadow-md text-white"
          style={{
            backgroundColor: popupMessage.includes("Success") ? "green" : "red",
          }}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default OrderCreation;
