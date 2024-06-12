import { BASE_API_URL } from "@/constants/constants";
import React from "react";

// Fetch data on the server
async function fetchData() {
  const response = await fetch(`${BASE_API_URL}/users`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.data; // Access the 'data' array directly
}

const UsersPage = async () => {
  const users = await fetchData();

  interface user {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  }
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: user) => (
          <li key={user.userId}>
            {user.fullName} - {user.email} - {user.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
