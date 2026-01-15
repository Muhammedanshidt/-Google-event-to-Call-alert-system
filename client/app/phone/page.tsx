"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";

export default function PhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    phoneNumber?: string;
    createdAt?: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user info to show their name
    fetch("http://localhost:3333/api/v1/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.user) {
          setUser(data.data.user);
          // If user already has phone, redirect to dashboard
          if (data.data.user.phoneNumber) {
            router.push("/dashboard");
          }
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/phone", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update phone number");
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
  
    if (digits.length === 10) {
      return `+91${digits}`;
    }
  
    if (digits.startsWith("91")) {
      return `+${digits.slice(0, 12)}`; 
    }
  
    return digits;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--muted))] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
            <Phone className="h-8 w-8 text-[hsl(var(--primary))]" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {user ? `Welcome, ${user.name}!` : "Complete Your Profile"}
          </CardTitle>
          <CardDescription>
            Please enter your phone number to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[hsl(var(--foreground))]"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={phoneNumber}
                onChange={handlePhoneChange}
                required
                className="w-full"
                disabled={loading}
              />
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Enter your Indian phone number (e.g., +91XXXXXXXXXX)
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-[hsl(var(--destructive))]/10 p-3 text-sm text-[hsl(var(--destructive-foreground))]">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !phoneNumber.trim()}
            >
              {loading ? "Saving..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
