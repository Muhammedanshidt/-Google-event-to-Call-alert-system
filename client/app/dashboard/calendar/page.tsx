"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

interface CalendarEvent {
  id: string;
  summary?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/calendar/me")
      .then((res) => setEvents(res.data.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load calendar");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading calendar...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Google Calendar</h1>

      {events.length === 0 && <p>No upcoming events</p>}

      {events.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <h2 className="font-semibold">
              {event.summary || "No Title"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {event.start?.dateTime || event.start?.date}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
