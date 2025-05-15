import React, { useEffect, useState } from "react";
import { IAssignment } from "@/types/assignment";

const Assignment = () => {
  const [assignment, setAssignment] = useState<IAssignment[]>([]);
  const fetchAssignment = async () => {
    const res = await fetch(`/api/assignment`, {
      method: "GET",
    });
    const response = await res.json();
    const sortedData = (response.data || []).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setAssignment(sortedData);

    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);
  return (

      <div className="h-60 w-full overflow-scroll ">
        <table className="w-full text-sm  text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Partner ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {assignment.map((a, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-blue-600">
                  {a.orderId.toString()}
                </td>
                <td className="px-4 py-2 font-mono">
                  {a.partnerId?.toString() || (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      a.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs text-gray-600">
                  {a.reason || "—"}
                </td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {a.createdAt ? new Date(a.createdAt).toLocaleString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {assignment.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">
            No assignments found.
          </div>
        )}
      </div>
 
  );
};

export default Assignment;
