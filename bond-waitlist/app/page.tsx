"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
    } else if (res.status === 409) {
      setServerError("That email is already on the list!");
    } else {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500 tracking-tight">Bond</span>
          <a
            href="#signup"
            className="bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
          >
            Join the waitlist
          </a>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Stop planning. <br />
            <span className="text-orange-500">Start going out.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Bond helps groups of friends discover great spots, coordinate plans, and actually show up — together.
          </p>
          <a
            href="#signup"
            className="mt-10 inline-block bg-orange-500 text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-orange-600 transition-colors shadow-md"
          >
            Get early access →
          </a>
        </section>

        {/* Features */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
              Everything your friend group needs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: "🍜",
                  title: "Discover",
                  body: "Find restaurants and hotspots your whole group will love — filtered by vibe, cuisine, and location.",
                },
                {
                  icon: "🗓️",
                  title: "Plan Together",
                  body: "Vote on spots, pick a time, and loop everyone in — no more endless group chats.",
                },
                {
                  icon: "🎉",
                  title: "Just Show Up",
                  body: "Bond handles the logistics so your crew can focus on having a good time.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="bg-[#FAF8F5] rounded-2xl p-8 flex flex-col gap-4"
                >
                  <span className="text-4xl">{icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our mission</h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            {"We built Bond because making plans with friends shouldn't feel like a full-time job. Our goal is simple: make it effortless for people to get off their phones and actually spend time together in the real world."}
          </p>
        </section>

        {/* Team */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">Meet the team</h2>
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { name: "Alex Chen", role: "Co-Founder & CEO" },
                { name: "Jordan Lee", role: "Co-Founder & CTO" },
                { name: "Sam Rivera", role: "Head of Design" },
              ].map(({ name, role }) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-500">
                    {name[0]}
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section id="signup" className="max-w-lg mx-auto px-6 py-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Get early access</h2>
            <p className="mt-3 text-gray-500">
              Be the first to know when Bond launches. No spam, ever.
            </p>
          </div>

          {submitted ? (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
              <span className="text-4xl">🎉</span>
              <p className="mt-4 text-lg font-semibold text-gray-900">You&apos;re on the list!</p>
              <p className="mt-2 text-gray-500">We&apos;ll reach out when it&apos;s time to Bond.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("first_name")}
                    placeholder="First name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("last_name")}
                    placeholder="Last name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-xs text-red-500">{errors.last_name.message}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              {serverError && (
                <p className="text-sm text-red-500 text-center">{serverError}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 text-white font-semibold py-3.5 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Joining..." : "Join the waitlist"}
              </button>
            </form>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-orange-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Bond. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
