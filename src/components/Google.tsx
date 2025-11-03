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
      const token = credentialResponse.credential;
      if (!token) throw new Error("No credential returned from Google");

      const response = await axiosClient.post(
        "/auth/google",
        { token },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 && response.data?.user) {
        const { user, jwt } = response.data;

        // ✅ Persist login data
        localStorage.setItem("token", jwt || token); // fallback to Google token
        localStorage.setItem("email", user.email);
        setUser(user);

        console.log("✅ Logged in as:", user.email);

        // Redirect after login
        if (user.verified) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = `/OTPVerification/${user.email}/${user.firstName}`;
        }
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
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
