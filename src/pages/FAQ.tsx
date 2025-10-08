import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What products and services does Jatayu India offer?',
    answer: 'Jatayu India offers a comprehensive range of premium, custom-made apparel and merchandise, along with other  personalised items which ranges from bags to pens, keychains mugs & other items based on requirement. Visit our Products page for detailed catalogue.',
  },
  {
    question: 'How can I place an order?',
    answer: 'To place an order, please connect with us over call or via email at help.jatayuindia@gmail.com For assistance, feel free to contact us through our Enquiry page.',
  },
  {
    question: 'What are the payment options available?',
    answer: 'We accept multiple payment methods including bank transfers, credit/debit cards, and online payment gateways. Payment status can be tracked through your customer dashboard after login.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once you log in to your customer dashboard, you can view all your orders along with their current status, delivery dates, and payment information in real-time.',
  },
  {
    question: 'What is your delivery timeline?',
    answer: 'Delivery timelines vary based on product type and location. Standard deliveries typically take 5-7 business days. Specific delivery dates for your orders are available in your customer dashboard.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we provide international shipping services. Shipping costs and delivery times vary by destination. Please contact us through the Enquiry page for international order details.',
  },
  {
    question: 'What is your return and refund policy?',
    answer: 'We offer a 2-day return policy for most products. Items must be in original condition. Please refer to our Terms & Conditions or submit a claim through our Claims page for detailed information.',
  },
  {
    question: 'How do I file a warranty claim?',
    answer: 'To file a warranty claim, visit our Claims page and fill out the claim form with your order details. Our team will review your claim and respond within 2-3 business days.',
  },
  {
    question: 'Can I modify or cancel my order?',
    answer: 'Orders can be modified or cancelled within 3 hours of placement. Please log in to your dashboard or contact our support team immediately if you need to make changes.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click on the "Forgot Password?" link on the login page. Enter your registered email address, and we\'ll send you instructions to reset your password.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-gray-400">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? Contact our support team for assistance.
          </p>
          <a
            href="/enquiry"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div
      className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
        isOpen ? 'border-cyan-500/50' : 'border-white/10 hover:border-white/20'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-white pr-8">{question}</h3>
        <ChevronDown
          className={`w-6 h-6 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6">
          <div className="border-t border-white/10 pt-4">
            <p className="text-gray-400 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
