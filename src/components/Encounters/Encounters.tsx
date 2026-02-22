"use client";

import { useEncounters } from "@/hooks/useEncounters";

const Encounters = () => {
  const { data, loading, error } = useEncounters();

  console.log({ data, loading, error });

  return <div>Encounters</div>;
};

export default Encounters;