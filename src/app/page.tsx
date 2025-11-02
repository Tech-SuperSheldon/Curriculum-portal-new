"use client";

import { useState } from "react";
import Viewer from "@/components/Viewer";

export default function Home() {
  const [error, setError] = useState("");

  return (
    <Viewer/>
  );
}
//comment
