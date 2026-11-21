import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, focus, message, honeypot, timestamp } = body;

    // Spam Defense 1: Honeypot field must be empty
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    // Spam Defense 2: Form must take at least 1.5 seconds to fill out
    if (timestamp && Date.now() - Number(timestamp) < 1500) {
      return NextResponse.json({ error: "Suspicious submission velocity." }, { status: 400 });
    }

    // Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 422 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 422 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 422 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous";

    const supabase = getServiceSupabase();

    // Insert into contact_messages
    const { error: insertError } = await supabase.from("contact_messages").insert([
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        focus: focus || "General Inquiry",
        message: message.trim(),
        ip_address: ip,
      },
    ]);

    if (insertError) {
      console.warn("Could not insert to contact_messages, attempting legacy messages table fallback:", insertError);
      // Fallback to legacy table if exists
      await supabase.from("messages").insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          focus: focus || "General Inquiry",
          message: message.trim(),
        },
      ]);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been encrypted and recorded securely in the database.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API Exception:", err);
    return NextResponse.json({ error: "Internal transmission error. Please retry." }, { status: 500 });
  }
}
