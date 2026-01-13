"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import {api} from "../../../lib/api";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCall = async () => {
    try {
      setLoading(true);
      setMessage("");
  
      const res = await api.get("/dashboard/phonecall");
  
      // Axios returns response inside `data`
      setMessage(res.data.message);
  
    } catch (err) {
        console.log(err)
        if (err && typeof err === "object" && "response" in err) {
          const apiErr = err as { response?: { data?: { message?: string } } };
          console.log("API ERROR:", apiErr.response || err);
          setMessage(apiErr.response?.data?.message || "Call failed");
        } else {
          console.log("API ERROR:", err);
          setMessage("Call failed");
        }
      }
      
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            📅 Google Calendar Reminder
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-gray-500">
            Click the button and we will call you about your next meeting.
          </p>

          <Button
            onClick={handleCall}
            disabled={loading}
            className="w-full flex gap-2"
          >
            <Phone />
            {loading ? "Calling..." : "Call me about my next meeting"}
          </Button>

          {message && (
            <p className="text-sm text-green-600 font-medium">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
