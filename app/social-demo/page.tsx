"use client";

import React from "react";
import SocialMediaLinks from "@/components/social-media-links";

export default function SocialDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Social Media Links</h1>
        <SocialMediaLinks username="@UAEMMAF" />
      </div>
    </div>
  );
} 