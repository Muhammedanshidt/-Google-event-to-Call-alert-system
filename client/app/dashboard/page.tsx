"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, LogOut } from "lucide-react";

type UserData = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  createdAt?: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      if (data?.data?.user) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--muted))]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[hsl(var(--primary))] border-r-transparent"></div>
          <p className="mt-4 text-[hsl(var(--muted-foreground))]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--muted))] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">
            Dashboard
          </h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-6">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-24 w-24 rounded-full border-4 border-[hsl(var(--border))] object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[hsl(var(--border))] bg-[hsl(var(--primary))]/10">
                    <User className="h-12 w-12 text-[hsl(var(--primary))]" />
                  </div>
                )}
              </div>
              <div>
                <CardTitle className="text-3xl">{user.name}</CardTitle>
                <CardDescription className="text-base">
                  Welcome back! Here&apos;s your profile information.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-4 rounded-lg border border-[hsl(var(--border))] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                  <Mail className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                    Email Address
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[hsl(var(--foreground))]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-[hsl(var(--border))] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                  <Phone className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                    Phone Number
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[hsl(var(--foreground))]">
                    {user.phoneNumber || (
                      <span className="text-[hsl(var(--muted-foreground))]">
                        Not provided
                      </span>
                    )}
                  </p>
                  {!user.phoneNumber && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => router.push("/phone")}
                    >
                      Add Phone Number
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {user.createdAt && (
              <div className="rounded-lg border border-[hsl(var(--border))] p-4">
                <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
                  Member Since
                </p>
                <p className="mt-1 text-lg font-semibold text-[hsl(var(--foreground))]">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
