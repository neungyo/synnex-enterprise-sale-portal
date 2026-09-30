"use client";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setMessage("");
    const form = new FormData(event.currentTarget); const email = String(form.get("email")); const password = String(form.get("password"));
    const result = await authClient.signIn.email({ email, password, callbackURL: "/" });
    if (result.error) { setMessage(result.error.message ?? "Unable to continue. Please check your details."); setPending(false); }
  }
  return <form className="mt-7 space-y-4" onSubmit={submit}><label className="block text-sm font-medium">Work email<input required type="email" name="email" className="mt-1.5 w-full rounded-xl border border-[#d7e5f0] px-3 py-2.5 outline-none focus:border-[#147fbc]" /></label><label className="block text-sm font-medium">Password<input required minLength={8} type="password" name="password" className="mt-1.5 w-full rounded-xl border border-[#d7e5f0] px-3 py-2.5 outline-none focus:border-[#147fbc]" /></label>{message && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{message}</p>}<button disabled={pending} className="w-full rounded-xl bg-[#147fbc] py-3 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Please wait…" : "Sign in"}</button><p className="text-center text-xs text-[#6a8aa6]">Accounts are created by the system administrator.</p></form>;
}
