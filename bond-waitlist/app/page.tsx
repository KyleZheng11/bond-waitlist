"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof schema>;

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

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
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500 tracking-tight">Bond</span>
          <motion.a
            href="#signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-600 transition-colors"
          >
            Join the waitlist
          </motion.a>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Background blobs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-10 -right-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            Stop planning. <br />
            <span className="text-orange-500">Start going out.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto"
          >
            Bond helps groups of friends discover great spots, coordinate plans, and actually show up — together.
          </motion.p>
          <motion.a
            href="#signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(249,115,22,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-block bg-orange-500 text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-orange-600 transition-colors shadow-md"
          >
            Get early access →
          </motion.a>
        </section>

        {/* Features */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
                Everything your friend group needs
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: "🍜",
                  title: "Discover",
                  body: "Find restaurants and hotspots your whole group will love — filtered by vibe, cuisine, and location.",
                  delay: 0,
                },
                {
                  icon: "🗓️",
                  title: "Plan Together",
                  body: "Vote on spots, pick a time, and loop everyone in — no more endless group chats.",
                  delay: 0.1,
                },
                {
                  icon: "🎉",
                  title: "Just Show Up",
                  body: "Bond handles the logistics so your crew can focus on having a good time.",
                  delay: 0.2,
                },
              ].map(({ icon, title, body, delay }) => (
                <FadeUp key={title} delay={delay}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-[#FAF8F5] rounded-2xl p-8 flex flex-col gap-4 cursor-default"
                  >
                    <span className="text-4xl">{icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <p className="text-gray-500 leading-relaxed">{body}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our mission</h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              {"We built Bond because making plans with friends shouldn't feel like a full-time job. Our goal is simple: make it effortless for people to get off their phones and actually spend time together in the real world."}
            </p>
          </FadeUp>
        </section>

        {/* Team */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">Meet the team</h2>
            </FadeUp>
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { name: "Kyle Zheng", role: "Founding Engineer" },
                { name: "Elton Dong", role: "Founder" },
                { name: "Maximilian Sawaya", role: "Founding Business Manager" },
              ].map(({ name, role }, i) => (
                <FadeUp key={name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-500">
                      {name[0]}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-sm text-gray-500">{role}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section id="signup" className="max-w-lg mx-auto px-6 py-24">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Get early access</h2>
              <p className="mt-3 text-gray-500">
                Be the first to know when Bond launches. No spam, ever.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center"
              >
                <span className="text-4xl">🎉</span>
                <p className="mt-4 text-lg font-semibold text-gray-900">You&apos;re on the list!</p>
                <p className="mt-2 text-gray-500">We&apos;ll reach out when it&apos;s time to Bond.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register("first_name")}
                      placeholder="First name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow"
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-xs text-red-500">{errors.first_name.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("last_name")}
                      placeholder="Last name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
                {serverError && (
                  <p className="text-sm text-red-500 text-center">{serverError}</p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 6px 24px rgba(249,115,22,0.35)" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="bg-orange-500 text-white font-semibold py-3.5 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Joining..." : "Join the waitlist"}
                </motion.button>
              </form>
            )}
          </FadeUp>
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
