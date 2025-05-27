"use client";

import React from "react";
import SocialMediaStyled from "@/components/social-media-styled";

export default function SocialDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Social Media Icons</h1>
        <SocialMediaStyled followText="Follow Us" />
      </div>
    </div>
  );
}