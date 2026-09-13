'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Bell, CheckCircle2, Clock } from 'lucide-react';

export default function MaintenancePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Add your API call or newsletter integration here
    }
  };

  return (
    <main className="min-h-screen  text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 text-center"
      >
        {/* Animated Icon Header */}
        <div className="mx-auto w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Wrench className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold tracking-tight mb-3">
          We are upgrading our platform
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Our website is currently undergoing scheduled maintenance to bring you a faster, better experience. We’ll be back online shortly!
        </p>

        {/* Expected Time Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs text-slate-300 mb-8">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Expected downtime: ~2 hours</span>
        </div>

        {/* Notification Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              Notify Me When Live
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-left text-emerald-400 text-sm"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>You are all set! We will notify you the moment we are back up.</span>
          </motion.div>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs text-slate-500">
          Need urgent help? Reach out at <a href="mailto:support@example.com" className="text-indigo-400 hover:underline">support@example.com</a>
        </div>
      </motion.div>
    </main>
  );
}