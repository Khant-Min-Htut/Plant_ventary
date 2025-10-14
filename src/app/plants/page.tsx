import React from "react";
import { stackServerApp } from "@/stack";
import { SignIn, SignUp } from "@stackframe/stack";

import { InventaryTable } from "@/components/InventaryTable";

import { getPlants } from "@/actions/plant.action";

async function page() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  const plants = await getPlants();
  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 gird grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventaryTable plants={plants} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}

export default page;
