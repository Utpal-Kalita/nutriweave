import React, { useEffect, useState } from 'react';
import { DemoOrder, getDemoOrders, updateDemoOrderStatus } from '../../lib/demoStore';
import { Loader2 } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setOrders(getDemoOrders().sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)));
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    updateDemoOrderStatus(id, newStatus);
    fetchOrders();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-display text-on-surface">Orders</h2>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-surface-container-high overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-surface-container-lowest border-b border-surface-container-high text-on-surface-variant text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-outline">{order.id.slice(0, 8)}...</td>
                  <td className="px-6 py-4 font-medium">{order.profiles?.full_name || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold">{order.product_name}</span>
                    <span className="text-on-surface-variant text-xs ml-2">x{order.quantity}</span>
                  </td>
                  <td className="px-6 py-4 font-bold">₹{order.total_price}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-surface-container-low border border-surface-container-high text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant">
              No orders found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
