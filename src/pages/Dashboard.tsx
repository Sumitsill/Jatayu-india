import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, LogOut, User, CreditCard, Truck, Clock } from "lucide-react";
import {supabase} from '../lib/supabase'
interface Order {
  id: string;
  order_number: string;
  quantity: number;
  order_type: string;
  delivery_date: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  // const checkUser = async () => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/signup/me/", {
  //       method: "GET",
  //       credentials: "include", // important for Django session cookies
  //     });

  //     if (!res.ok) {
  //       navigate("/login");
  //       return;
  //     }

  //     const userData = await res.json();
  //     setUser(userData);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     navigate("/login");
  //   }
  // };

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    setUser(user);
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:8000/logout/", {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Paid: "text-green-400 bg-green-500/20 border-green-500/30",
      Pending: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
      Failed: "text-red-400 bg-red-500/20 border-red-500/30",
      Processing: "text-blue-400 bg-blue-500/20 border-blue-500/30",
      Shipped: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
      Delivered: "text-green-400 bg-green-500/20 border-green-500/30",
      Cancelled: "text-red-400 bg-red-500/20 border-red-500/30",
    };
    return colors[status] || "text-gray-400 bg-gray-500/20 border-gray-500/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Customer{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-400">
              Welcome back, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Package className="w-6 h-6" />}
            title="Total Orders"
            value="0"
          />
          <StatCard
            icon={<Truck className="w-6 h-6" />}
            title="In Transit"
            value="0"
          />
          <StatCard
            icon={<CreditCard className="w-6 h-6" />}
            title="Pending Payments"
            value="0"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            title="Processing"
            value="0"
          />
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-6">
                Your order history will appear here once you make a purchase
              </p>
              <a
                href="/products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Type
                    </th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Quantity
                    </th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Delivery Date
                    </th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Payment
                    </th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-mono">
                        {order.order_number}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {order.order_type}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {order.quantity}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(order.delivery_date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.order_status
                          )}`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Profile Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    <span className="text-gray-500">Email:</span>{" "}
                    <span className="text-white">{user?.email}</span>
                  </p>
                  <p className="text-gray-400">
                    <span className="text-gray-500">Phone:</span>{" "}
                    <span className="text-white">
                      {user?.user_metadata?.phone || "Not provided"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Need Help?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Have questions about your orders? Our support team is here to
              assist you.
            </p>
            <a
              href="/enquiry"
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-105 hover:border-cyan-500/50 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
          {icon}
        </div>
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
