"use client";

import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      // ✅ This is the Google ID token (JWT)
      const token = credentialResponse.credential;
      if (!token) throw new Error("No credential returned from Google");

      // Persist token for secure routes (viewer, slides, etc.)
      localStorage.setItem("token", token);

      // 🔒 Verify token with your backend
      const verify = await fetch("/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const verifyData = await verify.json();

      if (!verify.ok || !verifyData.valid) {
        throw new Error("Google verification failed");
      }

      // ✅ Save user in context and localStorage
      setUser({
        email: verifyData.user,
        name: verifyData.name || "User",
        picture: verifyData.picture || "",
      });

      localStorage.setItem("email", verifyData.user);
      if (verifyData.name) localStorage.setItem("name", verifyData.name);
      if (verifyData.picture) localStorage.setItem("picture", verifyData.picture);

      console.log("✅ Verified via Google:", verifyData.user);

      // 🚀 Redirect user
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google Auth Error:", error);
      toast.error(
        error?.response?.data?.message ||
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
