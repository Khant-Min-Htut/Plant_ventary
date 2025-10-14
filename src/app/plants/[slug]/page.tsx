import React from "react";
import PlantCard from "./PlantCard";
import { getPlantById } from "@/actions/plant.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);
  return {
    title: plant ? plant.name : "Plant Details",
    Description: plant ? plant.description : "Plant detail page ",
  };
}

async function page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();

  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 gird grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
}

export default page;
