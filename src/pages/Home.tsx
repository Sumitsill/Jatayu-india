import Spline from '@splinetool/react-spline';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        { 
          <Spline scene="https://prod.spline.design/jvvPagGI-cSdA0fZ/scene.splinecode" /> 
        }
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
             
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Jatayu India
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner for innovative solutions and exceptional service delivery
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Link
                to="/login"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
              >
                Login
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/enquiry"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
            <ServiceCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Reliable"
              description="Industry-leading experts for your peace of mind"
            />
            <ServiceCard
              icon={<Zap className="w-8 h-8" />}
              title="Collaboration"
              description="Collaboration with 17+ partners across 51+ domains for premium quality products and absolute satisfaction"
            />
            <ServiceCard
              icon={<Globe className="w-8 h-8" />}
              title="Global Reach"
              description="Serving clients across borders with excellence"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-300" />

      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}