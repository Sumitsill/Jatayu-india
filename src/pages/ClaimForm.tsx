"use client";
import { useState } from "react";
import { Upload, FileText, Hash } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ClaimFormPage() {
  const [formData, setFormData] = useState<{
    order_id: string;
    description: string;
    image: File | null;
  }>({
    order_id: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  // Convert File -> Base64 (EmailJS supports attachments via base64)
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.order_id || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare EmailJS template params
      let imageBase64 = "";
      if (formData.image) {
        imageBase64 = await toBase64(formData.image);
      }

      const templateParams = {
        order_id: formData.order_id,
        description: formData.description,
        image: imageBase64, // Attach if template supports
      };

      await emailjs.send(
        "service_claim",
        "template_v0pezlw",
        templateParams,
        "oqW5LWJ9kGtpeOvqX"
      );

      alert("Claim submitted and email sent successfully!");

      // Reset form
      setFormData({
        order_id: "",
        description: "",
        image: null,
      });
    } catch (err) {
      setError("Failed to send email. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#001b3d] to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-white"
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          Submit Your Claim Request
        </h1>
        <p className="text-gray-400 text-center mb-10">
          Please fill in the details below to help us process your request
          faster.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" /> Order ID
            </label>
            <input
              type="text"
              name="order_id"
              value={formData.order_id}
              onChange={handleChange}
              placeholder="Enter your order ID"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" /> Problem Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the issue you’re facing"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" /> Upload Photo
              (optional)
            </label>
            <div className="w-full border border-dashed border-white/20 rounded-xl p-6 text-center hover:border-cyan-400 transition-all duration-200 cursor-pointer">
              <p className="text-gray-400 mb-2">
                Drag & drop or click to upload
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photoUpload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="photoUpload"
                className="cursor-pointer inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold"
              >
                Choose File
              </label>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
