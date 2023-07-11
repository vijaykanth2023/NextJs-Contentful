"use client"; // This is a client component
import React from "react";
import { client } from "@/lib/contentful/client";
import Link from "next/link";
import { useEffect, useState } from "react";

function UtilityMenu() {
  const [UtilityList, setUtilityList] = useState([]);

  const getUtilityMenu = async () => {
    try {
      const response = await client.getEntries({ content_type: "utilityMenu" });
      const responseData = response.items[0].fields.menu;
      setUtilityList(responseData);
      console.log("utilityMenu", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUtilityMenu();
  }, []);

  return (
    <nav className="bg-secondrary border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            {UtilityList.map((item, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white text-sm rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {item.fields.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UtilityMenu;
