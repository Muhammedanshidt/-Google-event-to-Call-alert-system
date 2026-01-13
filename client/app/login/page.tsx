"use client";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Icons } from "../../components/icons";
import Axios from "axios";

type GoogleAuthResponse = {
  message: string;
  data: string; // this is the Google OAuth URL
};


export default function LoginPage() {

 

  const loginWithGoogle = async () => {
    try {
      const res = await Axios.get("http://localhost:3333/api/v1/auth/google");
      console.log(res)
      window.location.href = res.data;
    } catch (err) {
      console.error("Google login failed", err);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--muted))] p-4">
      <Card className="w-full max-w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6 font-semibold text-lg"
            onClick={loginWithGoogle}
            type="button"
          >
            <Icons.google className="h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
