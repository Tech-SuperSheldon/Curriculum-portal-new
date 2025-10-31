"use client";

import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

type AllowedGoogleButtonText =
  | "signin_with"
  | "signup_with"
  | "continue_with"
  | "signin"
  | undefined;

interface GoogleAuthProps {
  buttonText?: AllowedGoogleButtonText;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({
  buttonText = "continue_with",
}) => {
  const { setUser } = useUser();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      // ✅ This is the Google ID token
      const token = credentialResponse.credential;
      if (!token) throw new Error("No credential returned from Google");

      // Store it for all secure routes (viewer, slides, etc.)
      localStorage.setItem("token", token);

      // Optional: Verify immediately via your backend
      const verify = await fetch("/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const verifyData = await verify.json();

      if (!verify.ok || !verifyData.valid) {
        throw new Error("Google verification failed");
      }

      // Save user context
      setUser({
        email: verifyData.user,
        name: verifyData.name || "User",
      });
      localStorage.setItem("email", verifyData.user);

      console.log("✅ Verified via Google:", verifyData.user);

      // Redirect user
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Google authentication failed"
      );
    }
  };

  const handleError = () => {
    toast.error("Google Sign-In failed");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        size="large"
        shape="rectangular"
        text={buttonText}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
