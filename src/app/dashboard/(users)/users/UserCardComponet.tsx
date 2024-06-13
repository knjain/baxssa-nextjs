import Link from "next/link";
import React from "react";

interface User {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface userProps {
  users: User[];
}

function UserCardComponet({ users }: userProps) {
  return (
    <div>
      <ul>
        {users.map((user: User) => (
          <div key={user.userId}>
            <li>
              {user.fullName} - {user.email} - {user.phoneNumber}
            </li>
            <Link href={`/dashboard/users/${user.userId}`}>Edit</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default UserCardComponet;
