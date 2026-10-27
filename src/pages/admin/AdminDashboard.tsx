import React, { useEffect, useState } from 'react';
import { getDemoOrders, getDemoProducts } from '../../lib/demoStore';
import { Package, ShoppingBag } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = () => {
      const orders = getDemoOrders();
      const products = getDemoProducts();
      const revenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0);

      setStats({
        totalOrders: orders.length,
        totalProducts: products.length,
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
      <h2 className="text-3xl font-bold font-display text-on-surface mb-8 xl:text-4xl">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 border-y-2 border-rule-2 lg:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-rule bg-paper p-6 lg:border-r xl:border-b-0 last:border-r-0">
            <div className={`flex h-14 w-14 items-center justify-center ${stat.bg}`}>
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
