"use client";
import { Upload, FileText, Hash } from "lucide-react";
import { motion } from "framer-motion";

export default function ClaimFormPage() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#001b3d] to-black flex items-center justify-center p-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // ↓ Reduced size (from max-w-2xl to max-w-xl and p-10 to p-8)
        className="max-w-xl w-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Submit Your Claim Request
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Please fill in the details below to help us process your request faster.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" /> Order ID
            </label>
            <input
              type="text"
              placeholder="Enter your order ID"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" /> Problem Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the issue you’re facing"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" /> Upload Photo (optional)
            </label>
            <div className="w-full border border-dashed border-white/20 rounded-xl p-5 text-center hover:border-cyan-400 transition-all duration-200 cursor-pointer">
              <p className="text-gray-400 mb-2">Drag & drop or click to upload</p>
              <input type="file" accept="image/*" className="hidden" id="photoUpload" />
              <label
                htmlFor="photoUpload"
                className="cursor-pointer inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold"
              >
                Choose File
              </label>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
