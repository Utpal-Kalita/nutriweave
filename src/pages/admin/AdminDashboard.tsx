import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, ShoppingBag, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: ordersCount, data: orders } = await supabase
        .from('orders')
        .select('total_price', { count: 'exact' });

      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      const revenue = orders?.reduce((sum, order) => sum + (order.total_price || 0), 0) || 0;

      setStats({
        totalOrders: ordersCount || 0,
        totalProducts: productsCount || 0,
        totalRevenue: revenue,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <ShoppingBag size={24} className="text-primary" />, bg: 'bg-primary-container' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <ShoppingBag size={24} className="text-secondary" />, bg: 'bg-secondary-container' },
    { title: 'Total Products', value: stats.totalProducts, icon: <Package size={24} className="text-tertiary" />, bg: 'bg-tertiary-container' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold font-display text-on-surface mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-surface-container-high shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-on-surface">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
