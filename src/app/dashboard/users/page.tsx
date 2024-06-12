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


// import axios from "axios";
// import { BASE_API_URL } from "@/constants/constants";
// import React from "react";

// // Fetch data on the server
// async function fetchData() {
//   try {
//     const response = await axios.get(`${BASE_API_URL}/users`, {
//       headers: {
//         "Cache-Control": "no-store",
//       },
//     });
//     return response.data.data;
//   } catch (error: any) {
//     if (error.response) {

//       throw new Error(`Request failed with status ${error.response.status}`);
//     } else if (error.request) {
//       // The request was made but no response was received
//       throw new Error("No response received from server");
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       throw new Error(`Error setting up the request: ${error.message}`);
//     }
//   }
// }

// const UsersPage = async () => {
//   const users = await fetchData();

//   interface User {
//     userId: string;
//     fullName: string;
//     email: string;
//     phoneNumber: string;
//   }

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map((user: User) => (
//           <li key={user.userId}>
//             {user.fullName} - {user.email} - {user.phoneNumber}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UsersPage;
