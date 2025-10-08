"use client";

import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion"; // Keep this import
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Claims() {
  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Free Shipping",
      description:
        "Free shipping and delivery on all orders & no minimum order value",
      step: "1",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quality Check",
      description:
        "All products go through 5+ quality checks to assure quality",
      step: "2",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Easy Payments",
      description: "Flexible, safe and secure payment methods available",
      step: "3",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Returns Applicable *",
      description: "We accept 2 day returns on our products",
      step: "4",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Best Pricing",
      description:
        "Lowest pricing guarantee, we match or pay the difference*",
      step: "5",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Policy Terms",
      description: "Click here to download terms & conditions",
      step: "6",
      onClick: () => window.open("/terms", "_blank"),
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Claims &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Warranty
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We stand behind our products with comprehensive warranty coverage
            and hassle-free claims process
          </p>
        </div>

        {/* 🔹 Coverflow Carousel for Process Cards */}
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mb-16"
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="ClaimsCarousel"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index} style={{ width: "300px" }}>
                <ProcessCard {...step} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Ready to submit a claim? Contact our support team for assistance
          </p>
          <a
            href="/claimform"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Submit Claim Request
          </a>
        </div>
      </div>

      {/* 🔸 Extra Carousel Styles */}
      <style>{`
        .ClaimsCarousel {
          width: 100%;
          height: 420px;
          padding-bottom: 50px !important;
        }
        .ClaimsCarousel .swiper-slide {
          background: transparent;
        }
        .swiper-pagination-bullet {
          background-color: #00bcd4 !important;
        }
      `}</style>
    </div>
  );
}

function ProcessCard({
  icon,
  title,
  description,
  step,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-4xl font-bold text-white/10">{step}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
