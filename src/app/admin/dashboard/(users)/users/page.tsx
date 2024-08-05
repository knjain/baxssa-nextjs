import axios from "axios";
import { BACKEND_API_URL } from "@/constants/constants";
import React from "react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { User, columns } from "./columns";
async function fetchData(): Promise<User[]> {
  try {
    const response = await axios.get(
      `${BACKEND_API_URL}/api/v1/admin/getAllUsers`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
}

const UsersPage = async () => {
  const users = await fetchData();

  return (
    <div>
      <h1 className="text-center text-3xl">User List</h1>
      <div className=" mb-5 mt-3 md:mt-0 lg:ml-[1028px]">
        <Link
          href={`/admin/dashboard/addNewUser`}
          className=" shadow-md rounded-md bg-blue-200 md:px-6 md:py-3 px-2 py-1"
        >
          ADD NEW USER
        </Link>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersPage;

////////////////////////////////////
// no-store:
// Purpose: Prevents any caching of the response.
// Behavior: The response is not stored in any cache. A fresh request is made to the server each time.
// Use Cases: Sensitive data, highly dynamic content.

// no-cache:
// Purpose: Ensures the cached response is validated before use.
// Behavior: The response can be stored in the cache, but the cache must revalidate it with the server before serving it.
// Use Cases: Frequently updated content, performance optimization with up-to-date content assurance.

////////////////////////////////////

// import { BASE_API_URL } from "@/constants/constants";
// import React from "react";
// import Link from "next/link";

// // Fetch data on the server
// async function fetchData() {
//   const response = await fetch(`${BASE_API_URL}/users`, {
//     cache: "no-store",
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const data = await response.json();
//   return data.data; // Access the 'data' array directly
// }

// const UsersPage = async () => {
//   const users = await fetchData();

//   interface user {
//     userId: string;
//     fullName: string;
//     email: string;
//     phoneNumber: string;
//   }
//   return (
//     <div>
//       <h1>Users</h1>
//       <Link href={`/dashboard/addNewUser`}>ADD NEW USER</Link>

//       <ul>
//         {users.map((user: user) => (
//           <div key={user.userId}>
//             <li>
//               {user.fullName} - {user.email} - {user.phoneNumber}
//             </li>
//             <Link href={`/dashboard/users/${user.userId}`}>Edit</Link>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UsersPage;
