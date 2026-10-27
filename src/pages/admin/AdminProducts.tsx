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
        <span className="border-y border-rule px-4 py-2 text-sm font-medium text-ink-2">Demo catalog</span>
      </div>

      <div className="mb-6 border-y border-rule bg-paper-2 p-4 text-sm leading-relaxed text-ink-2">
        Demo products are explicitly mapped to workbook Levels 1, 2, and 3. Confirm these assignments against the production catalog before launch; legacy product levels are not used by the recommender.
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="overflow-x-auto border-y-2 border-rule-2 bg-paper">
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
                    <span className="border-y border-rule px-2 py-1 text-sm font-medium text-ink">
                      Level {product.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.recommendation_level ? (
                      <span className="border-y border-rule-2 px-2 py-1 text-sm font-medium text-ink">
                        Level {product.recommendation_level} · {product.polishing_percentage ? `${product.polishing_percentage}% polish` : 'polishing not set'}
                      </span>
                    ) : (
                      <span className="border-y border-rule px-2 py-1 text-sm font-medium text-ink-2">Not mapped</span>
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
