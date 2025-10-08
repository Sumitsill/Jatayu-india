// import { Package, ExternalLink } from 'lucide-react';
// import ElfsightWidget from "../components/ElfsightWidget";
// export default function Products() {
//   return (
//     <div className="min-h-screen pt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//             Product <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Catalogue</span>
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Discover our comprehensive range of innovative products and solutions
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           <ProductCard
//             title="Green Cycling"
//             description="Tired of old boring plastic bags? No worries! Get your custom designed jute bags now."
//             category="Manufacturing"
//           />
//           <ProductCard
//             title="Fashion Star"
//             description="Not finding wear as your liking? No worries! Just imagine your design and let us do the magic."
//             category="Fashion"
//           />
//           <ProductCard
//             title="Autograph"
//             description="Every signature is vital,make the most of it! Get your custom designed pens now."
//             category="Education"
//           />
//           <ProductCard
//             title="Memories"
//             description="Can't get a memory out of your head? No worries! Get it engraved on a keychain and move along."
//             category="Gifting"
//           />
//           <ProductCard
//             title="Chai Break"
//             description="Every drink counts on health, make sure what you're drinking is healthy!"
//             category="Accessories"
//           />
//           <ProductCard
//             title="Talk To Us"
//             description="Want something but item not in our catalogue? No problem! Just let us know and we shall get it done for you."
//             category="Services"
//           />
//         </div>

//         <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-12 text-center">
//           <Package className="w-16 h-16 text-blue-400 mx-auto mb-6" />
//           <h2 className="text-3xl font-bold text-white mb-4">View Complete Catalogue</h2>
//           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
//             Explore our detailed product catalogue with specifications, pricing, and availability information
//           </p>
//           <a
//             href="/Jatayu_India_Winter_Catalogue.pdf"
//             download="Jatayu_Catalogue.pdf"
//             className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
//           >
//             Download Latest Catalogue
//             <ExternalLink className="w-5 h-5" />
//           </a>
//           <ElfsightWidget />
//         </div>

//       </div>
//     </div>
//   );
// }

// function ProductCard({ title, description, category }: { title: string; description: string; category: string }) {
//   return (
//     <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />

//       <div className="relative z-10">
//         <div className="flex items-start justify-between mb-4">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//             <Package className="w-6 h-6 text-white" />
//           </div>
//           <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">
//             {category}
//           </span>
//         </div>

//         <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
//         <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { Package, ExternalLink, X } from "lucide-react";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const existingScript = document.getElementById("heyzine-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://cdnc.heyzine.com/release/addons.5.min.js";
        script.async = true;
        script.id = "heyzine-script";
        script.onload = () => {
          // @ts-ignore
          if (window.heyzinea) window.heyzinea.addons.init();
        };
        document.body.appendChild(script);
      }
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Product{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Catalogue
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our comprehensive range of innovative products and
            solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ProductCard
            title="Tshirts and Hoodies"
            description="Not finding wear as your liking? No worries! Just imagine your design and let us do the magic.."
            category="Fashion"
          />
          <ProductCard
            title="Bottles and Mugs"
            description="Get your custom designed bottles or mugs and relive all your old memories with every sip."
            category="Gifting"
          />
          <ProductCard
            title="Pens and Keychains"
            description="Small things count, make the most of it! Get your custom designed vitals now."
            category="Accessories"
          />
          <ProductCard
            title="Bags and More"
            description="Flaunt you power in public, because hard work deserves recognition."
            category="Bags"
          />
          <ProductCard
            title="Frames and Plaques "
            description="Can't get a memory out of your head? No worries! Get it engraved and move along!"
            category="Home Decor"
          />
          <ProductCard
            title="Talk To Us"
            description="Want something but item not in our catalogue? No problem! Just let us know and we shall get it done for you."
            category="Services"
          />
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-12 text-center">
          <Package className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            View Complete Catalogue
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore our detailed product catalogue with specifications, pricing,
            and availability information
          </p>

          {/* Button container */}
          <div className="flex justify-center items-center space-x-3">
            <a
              href="/public/Jatayu_India_Winter_Catalogue.pdf"
              download="Jatayu_Catalogue.pdf"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Download Full Catalogue
              <ExternalLink className="w-5 h-5" />
            </a>

            {/* <a
              href="https://07ae8b2fc6894838881647610e29c04d.elf.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Open in Browser
              <ExternalLink className="w-5 h-5" />
            </a> */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Open in Browser
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="relative bg-gray-900 border border-blue-500/30 rounded-2xl p-6 w-full max-w-5xl h-[80vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Jatayu India Product Catalogue
              </h2>

              {/* ✅ Heyzine Embed */}
              <iframe
                allowFullScreen
                allow="clipboard-write"
                scrolling="no"
                className="fp-iframe"
                src="https://heyzine.com/flip-book/69a73fd25b.html"
                style={{
                  border: "1px solid lightgray",
                  width: "100%",
                  height: "600px",
                }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  title,
  description,
  category,
}: {
  title: string;
  description: string;
  category: string;
}) {
  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
