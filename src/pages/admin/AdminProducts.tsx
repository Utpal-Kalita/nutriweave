import React, { useEffect, useState } from 'react';
import { DemoProduct, getDemoProducts } from '../../lib/demoStore';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<DemoProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setProducts(getDemoProducts().sort((a, b) => a.level - b.level));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-display text-on-surface">Products</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium hover:bg-primary-container transition-colors">
          <Plus size={18} />
          Add Product
        </button>
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
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Level</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-on-surface">{product.name}</p>
                    <p className="text-xs text-on-surface-variant truncate max-w-xs">{product.description}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-md text-xs font-bold">
                      Level {product.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-8 text-center text-on-surface-variant">
              No products found. Add your first product.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
