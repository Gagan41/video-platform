"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { DialogTitle } from "@/components/ui/dialog";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b shadow-sm bg-white sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-tight">
          StreamPro 🎥
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <DialogTitle className="text-lg font-semibold">Menu</DialogTitle>{" "}
            {/* ✅ required title */}
            <div className="space-y-4 mt-6">
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
              <Link href="/shorts" className="block hover:text-blue-600">
                Shorts
              </Link>
              <Link href="/videos" className="block hover:text-blue-600">
                Videos
              </Link>
              <Link href="/login" className="block hover:text-blue-600">
                Login
              </Link>
              <Link href="/signup" className="block hover:text-blue-600">
                Sign Up
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          Unlimited Videos & Shorts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-gray-600 mb-6"
        >
          Stream your favorite creators. Upgrade for full access to premium
          content.
        </motion.p>
        <Button asChild>
          <Link href="/signup">Get Started for Free</Link>
        </Button>
      </section>

      {/* Featured Shorts/Videos */}
      <section className="px-6 py-12 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Featured Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.03 }}
              className="rounded overflow-hidden shadow bg-white p-4"
            >
              <div className="aspect-video bg-gray-300 rounded mb-4"></div>
              <h3 className="font-medium">Sample Video Title {item}</h3>
              <p className="text-sm text-gray-500">
                A short description of the featured content.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-12 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm leading-7 list-disc pl-4">
                <li>Access to free Shorts</li>
                <li>Preview trailers for all videos</li>
                <li>Basic browsing features</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-300">
            <CardHeader>
              <CardTitle>Premium Plan – ₹499/mo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm leading-7 list-disc pl-4">
                <li>Unlock full videos</li>
                <li>Access premium Shorts</li>
                <li>Support creators directly</li>
              </ul>
              <p className="text-xs text-red-500 mt-4">*Payment coming soon</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 px-6 border-t">
        <h2 className="text-3xl font-semibold text-center mb-10">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-6 rounded shadow"
            >
              <p className="text-sm text-gray-700 italic">
                “StreamPro has changed how I consume content. The shorts are
                amazing and the UI is beautiful!”
              </p>
              <p className="mt-4 font-semibold">— User {i + 1}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-gray-100 px-6">
        <h3 className="text-2xl font-semibold mb-4">Want full access?</h3>
        <p className="text-gray-600 mb-6">
          Join our premium plan and watch everything without limits.
        </p>
        <Button asChild variant="outline">
          <Link href="/signup">Join Premium</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t bg-white">
        &copy; {new Date().getFullYear()} StreamPro. All rights reserved.
      </footer>
    </main>
  );
}
