"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  }, [token]);

  return <p>Logging you in...</p>;
}
