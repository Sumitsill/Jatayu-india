// import { useState } from 'react';
// import { Send, Mail, Phone, User, MessageSquare } from 'lucide-react';

// export default function Enquiry() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus('idle');

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setSubmitStatus('success');
//       setFormData({ name: '', email: '', phone: '', message: '' });
//     } catch (error) {
//       setSubmitStatus('error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen pt-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center mb-16">
//           <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <MessageSquare className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//             Get in <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
//           </h1>
//           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//             Have a question or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                     Full Name *
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                     Email Address *
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
//                       placeholder="your.email@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
//                     Phone Number *
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
//                       placeholder="+91 XXXXXXXXXX"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
//                     Message *
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={6}
//                     className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
//                     placeholder="Tell us about your enquiry..."
//                   />
//                 </div>

//                 {submitStatus === 'success' && (
//                   <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300">
//                     Thank you for your enquiry! We'll get back to you within 24 hours.
//                   </div>
//                 )}

//                 {submitStatus === 'error' && (
//                   <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
//                     Something went wrong. Please try again later.
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     'Sending...'
//                   ) : (
//                     <>
//                       Send Message
//                       <Send className="w-5 h-5" />
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <ContactCard
//               icon={<Mail className="w-6 h-6" />}
//               title="Email Us"
//               content="help.jatayuindia@gmail.com"
//               href="mailto:help.jatayuindia@gmail.com"
//             />
//             <ContactCard
//               icon={<Phone className="w-6 h-6" />}
//               title="Call Us"
//               content="+91 8910887363"
//               href="tel:+918910887363"
//             />
//             <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold text-white mb-3">Business Hours</h3>
//               <div className="space-y-2 text-gray-400 text-sm">
//                 <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
//                 <p>Saturday: 9:00 AM - 1:00 PM</p>
//                 <p>Sunday: Closed</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactCard({ icon, title, content, href }: { icon: React.ReactNode; title: string; content: string; href: string }) {
//   return (
//     <a
//       href={href}
//       className="block bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300"
//     >
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
//           {icon}
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
//           <p className="text-gray-400 text-sm">{content}</p>
//         </div>
//       </div>
//     </a>
//   );
// }


import { useState } from 'react';
import { Send, Mail, Phone, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace with your EmailJS IDs
      const serviceID = 'service_jatayu';
      const templateID = 'template_l8e5i2a';
      const publicKey = 'OWBAV1bf49Qqf56bH';

      const result = await emailjs.send(serviceID, templateID, formData, publicKey);

      if (result.text === 'OK') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Get in{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your enquiry..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300">
                    ✅ Thank you for your enquiry! We'll get back to you within 24 hours.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
                    ❌ Something went wrong. Please try again later.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <ContactCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Us"
              content="help.jatayuindia@gmail.com"
              href="mailto:help.jatayuindia@gmail.com"
            />
            <ContactCard
              icon={<Phone className="w-6 h-6" />}
              title="Call Us"
              content="+91 8910887363"
              href="tel:+918910887363"
            />
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Business Hours</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{content}</p>
        </div>
      </div>
    </a>
  );
}
