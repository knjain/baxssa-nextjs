// "use client";

// import React from "react";

// import Link from "next/link";
// import { useSelectedLayoutSegment } from "next/navigation";

// import useScroll from "@/hooks/use-scroll";
// import { cn } from "@/lib/utils";
// import baxsaaLogo from "../../../../../public/images/baxsaaLogo.png";
// import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";
// import { User } from "next-auth";
// function Navbar() {
//   const scrolled = useScroll(5);
//   const selectedLayout = useSelectedLayoutSegment();

//   const { data: session } = useSession();

//   const user: User = session?.user as User; //if you don"t want to do this assertion, directly use

//   return (
//     <div
//       className={cn(
//         `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 shadow-md`,
//         {
//           "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
//           "border-b border-gray-200 bg-white": selectedLayout,
//         }
//       )}
//     >
//       <div className="flex h-[47px] items-center justify-between px-4">
//         <div className="flex items-center space-x-4">
//           <Link
//             href="/"
//             className="flex flex-row space-x-3 items-center justify-center md:hidden"
//           >
//             <Image
//               src={baxsaaLogo}
//               alt="Baxsaa Logo"
//               width={100}
//               height={100}
//               className=""
//             />
//           </Link>
//         </div>

//         <div className="hidden md:block">
//           <span className="font-semibold text-sm">
//             Hello, {user?.fullName}
//             <button
//               onClick={() =>
//                 signOut({  callbackUrl: "/sign-in" })
//               }
//               className="rounded-xl px-5 py-2 bg-blue-300  ml-4 mr-2"
//             >
//               Logout

//             </button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import baxsaaLogo from "../../../../../public/images/baxsaaLogo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { useToast } from "@/components/ui/use-toast";
function Navbar() {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const { data: session } = useSession();
  const user: User = session?.user as User; //if you dont want to do this assertion, directly use session?.user.fullName wherever required.
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/sign-in" });
    } catch (error) {
      console.error("Error signing out", error);
      toast({
        title: "Error",
        description: "Error Logging out. Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 shadow-md`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image
              src={baxsaaLogo}
              alt="Baxsaa Logo"
              width={100}
              height={100}
              className=""
            />
          </Link>
        </div>

        {user && (
          <div className="hidden md:block">
            <span className="font-semibold text-sm">
              Hello, {user.fullName}
              <button
                onClick={handleSignOut}
                className={`rounded-xl px-5 py-2 bg-blue-300 ml-4 mr-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Signing out..." : "Logout"}
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
