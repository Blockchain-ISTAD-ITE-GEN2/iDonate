"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./loading";

interface DelayedContentProps {
  children: React.ReactNode;
}

const DelayedLoader: React.FC<DelayedContentProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a 5-second delay
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default DelayedLoader;
