"use client";

import Loader from "@/components/Loader";
import React, { useState, useEffect } from "react";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading (or remove if using real loading triggers)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default LayoutWrapper;
