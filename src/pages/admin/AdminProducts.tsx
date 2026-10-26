import React, { useEffect, useState } from 'react';
import { DemoProduct, getDemoProducts } from '../../lib/demoStore';
import { Loader2 } from 'lucide-react';

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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold font-display text-on-surface">Products</h2>
        <span className="rounded-full bg-surface-container px-4 py-2 text-sm font-semibold text-on-surface-variant">Demo catalog</span>
      </div>

      <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        Products must have an explicit recommender variant mapping before they can be offered for a Level 1, 2, or 3 result. Legacy product levels are not treated as workbook recommendation levels.
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-surface-container-high overflow-x-auto shadow-sm">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-surface-container-lowest border-b border-surface-container-high text-on-surface-variant text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Legacy level</th>
                <th className="px-6 py-4 font-semibold">Recommender variant</th>
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
                  <td className="px-6 py-4">
                    {product.recommendation_level ? (
                      <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                        Level {product.recommendation_level} · {product.polishing_percentage ? `${product.polishing_percentage}% polish` : 'polishing not set'}
                      </span>
                    ) : (
                      <span className="rounded-md bg-surface-container px-2 py-1 text-xs font-bold text-on-surface-variant">Not mapped</span>
                    )}
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
