import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const data = [{ name: "count of users", activeCount: 25, inactiveCount: 15 }];

const Dashboard = () => {
  const [countUserData, setCountUserData] = useState({});
  const data = [];
  data.push(countUserData);
  console.log(data);
  console.log(countUserData);
  useEffect(() => {
    axios
      .get("http://192.168.1.85:8095/api/usersCount")
      .then((res) => {
        console.log(res);
        setCountUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-row  justify-around align-center mb-10">
        <div className="shadow-slate-800 h-40 w-80 border-blue-500 border-2 p-6 flex flex-col justify-center align-center rounded-xl">
          <h1 className="text-2xl">Active Users</h1>
          <p className="mt-4 text-blue-700 text-4xl">
            {countUserData.Active_Count}
          </p>
        </div>
        <div className="ml-6 h-40 w-80 border-blue-500 border-2 p-6 rounded-xl flex flex-col justify-center align-center">
          <h1 className="text-2xl">Inactive Users</h1>
          <p className="mt-4 text-blue-700 text-4xl">
            {countUserData.Inactive_Count}
          </p>
        </div>
      </div>
      <div className="flex  justify-center align-center">
        <BarChart width={400} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="count of users" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Active_Count"
            name="Active Users"
            fill="#8884d8"
            className="hover:opacity-75"
          />
          <Bar
            dataKey="Inactive_Count"
            name="Inactive Users"
            fill="#82ca9d"
            className="hover:opacity-75"
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
