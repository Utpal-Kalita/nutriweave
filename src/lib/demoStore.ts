import type { RecommendationAnswers, RecommendationLevel } from './recommendation';

export interface DemoUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
}

export interface DemoSession {
  access_token: string;
  user: DemoUser;
}

export interface DemoProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'customer';
  minerals_priority: number;
  glycemic_priority: number;
  protein_priority: number;
  matched_level: number;
  taste_priority?: number;
  overall_nutrition_priority?: number;
  recommendation_answers?: RecommendationAnswers;
  recommendation_level?: RecommendationLevel;
  recommendation_version?: string;
  matched_product_id?: string | null;
  updated_at: string;
}

export interface DemoProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  level: number;
  recommendation_level?: RecommendationLevel;
  polishing_percentage?: 25 | 50 | 75;
}

export interface DemoOrder {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  total_price: number;
  quantity: number;
  size: string;
  frequency: string;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email?: string;
  };
}

const SESSION_KEY = 'nutriweave:demo-session';
const PROFILES_KEY = 'nutriweave:demo-profiles';
const ORDERS_KEY = 'nutriweave:demo-orders';
const PRODUCTS_KEY = 'nutriweave:demo-products';

const riceImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOKYVkSAThdFox_Rm6aKWzQfZdJamvPRq3Yp-YTKk2s944tiAqESoA4W3fcqfLFpnpvWevRWe2frVhwID9eYv0UE7xzbNn6PabpAWXNiWnFgFXBF6TFKIFHgmCeqK3q9Hs1q2JfJpNq3zt6Cy-gXjiK97iBFJYxTIjlETl8YXXbDOgIAT3gN6cOaK_9Iq6VjC-ZdddXc9iPEyJ-QGmHFXb2BBFMV38IZ05v0Sq53VZwVoduuHEaDQhoMKGctq6UpU-FcBxQEpuEFg';

const defaultProducts: DemoProduct[] = [
  {
    id: 'demo-product-1',
    name: 'Nutrifibe Level 1 Protein Rice',
    description: 'Demo product mapped to the 25% polishing variant. Nutritional measurements require verification.',
    price: 549,
    image_url: riceImage,
    level: 2,
    recommendation_level: 1,
    polishing_percentage: 25,
  },
  {
    id: 'demo-product-2',
    name: 'Nutrifibe Level 2 Protein Rice',
    description: 'Demo product mapped to the 50% polishing variant. Nutritional measurements require verification.',
    price: 499,
    image_url: riceImage,
    level: 5,
    recommendation_level: 2,
    polishing_percentage: 50,
  },
  {
    id: 'demo-product-3',
    name: 'Nutrifibe Level 3 Protein Rice',
    description: 'Demo product mapped to the 75% polishing variant. Nutritional measurements require verification.',
    price: 449,
    image_url: riceImage,
    level: 8,
    recommendation_level: 3,
    polishing_percentage: 75,
  },
];

function applyDefaultProductMappings(products: DemoProduct[]) {
  return products.map((product) => {
    const defaultProduct = defaultProducts.find((item) => item.id === product.id);
    if (!defaultProduct?.recommendation_level || !defaultProduct.polishing_percentage) return product;

    return {
      ...product,
      name: defaultProduct.name,
      description: defaultProduct.description,
      recommendation_level: defaultProduct.recommendation_level,
      polishing_percentage: defaultProduct.polishing_percentage,
    };
  });
}

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

const safeId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const normalizeEmail = (value: string) => {
  const trimmed = value.trim();
  return trimmed.includes('@') ? trimmed.toLowerCase() : `${trimmed || 'demo'}@demo.local`;
};

export function getDemoSession() {
  return readJson<DemoSession | null>(SESSION_KEY, null);
}

export function setDemoSession(session: DemoSession | null) {
  if (!canUseStorage()) return;

  if (session) {
    writeJson(SESSION_KEY, session);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export function createDemoSession(identity: string) {
  const email = normalizeEmail(identity);
  const name = email.split('@')[0] || 'Demo User';
  const existingProfile = getDemoProfiles().find((profile) => profile.email === email);
  const user: DemoUser = {
    id: existingProfile?.id || safeId(),
    email,
    user_metadata: {
      full_name: existingProfile?.full_name || name,
    },
  };

  ensureDemoProfile(user);

  const session: DemoSession = {
    access_token: `demo-token-${user.id}`,
    user,
  };
  setDemoSession(session);
  return session;
}

export function getDemoProfiles() {
  return readJson<DemoProfile[]>(PROFILES_KEY, []);
}

export function ensureDemoProfile(user: DemoUser) {
  const profiles = getDemoProfiles();
  const existing = profiles.find((profile) => profile.id === user.id);

  if (existing) return existing;

  const profile: DemoProfile = {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata.full_name,
    role: 'admin',
    minerals_priority: 2,
    glycemic_priority: 3,
    protein_priority: 1,
    matched_level: 5,
    updated_at: new Date().toISOString(),
  };

  writeJson(PROFILES_KEY, [...profiles, profile]);
  return profile;
}

export function getDemoProfile(userId: string) {
  return getDemoProfiles().find((profile) => profile.id === userId) || null;
}

export function saveDemoProfile(update: Partial<DemoProfile> & { id: string }) {
  const profiles = getDemoProfiles();
  const index = profiles.findIndex((profile) => profile.id === update.id);
  const next = {
    ...(index >= 0 ? profiles[index] : {
      email: 'demo@demo.local',
      full_name: 'Demo User',
      role: 'admin' as const,
      minerals_priority: 2,
      glycemic_priority: 3,
      protein_priority: 1,
      matched_level: 5,
    }),
    ...update,
    updated_at: update.updated_at || new Date().toISOString(),
  };

  if (index >= 0) {
    profiles[index] = next;
  } else {
    profiles.push(next);
  }

  writeJson(PROFILES_KEY, profiles);
  return next;
}

export function getDemoProducts() {
  const products = readJson<DemoProduct[]>(PRODUCTS_KEY, []);
  if (products.length > 0) {
    const migratedProducts = applyDefaultProductMappings(products);
    const mappingChanged = migratedProducts.some((product, index) => (
      product.recommendation_level !== products[index].recommendation_level
      || product.polishing_percentage !== products[index].polishing_percentage
      || product.name !== products[index].name
      || product.description !== products[index].description
    ));

    if (mappingChanged) writeJson(PRODUCTS_KEY, migratedProducts);
    return migratedProducts;
  }

  writeJson(PRODUCTS_KEY, defaultProducts);
  return defaultProducts.map((product) => ({ ...product }));
}

export function getBestDemoProduct(matchedLevel: number) {
  const products = getDemoProducts();
  return products.reduce((best, product) => (
    Math.abs(product.level - matchedLevel) < Math.abs(best.level - matchedLevel) ? product : best
  ), products[0]);
}

export function getDemoOrders() {
  const orders = readJson<DemoOrder[]>(ORDERS_KEY, []);
  const profiles = getDemoProfiles();

  return orders.map((order) => {
    const profile = profiles.find((item) => item.id === order.user_id);
    return {
      ...order,
      profiles: profile ? { full_name: profile.full_name, email: profile.email } : order.profiles,
    };
  });
}

export function getDemoOrdersForUser(userId: string) {
  return getDemoOrders()
    .filter((order) => order.user_id === userId)
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
}

export function addDemoOrder(order: Omit<DemoOrder, 'id' | 'created_at'> & { created_at?: string }) {
  const nextOrder: DemoOrder = {
    ...order,
    id: safeId(),
    created_at: order.created_at || new Date().toISOString(),
  };
  writeJson(ORDERS_KEY, [nextOrder, ...getDemoOrders()]);
  return nextOrder;
}

export function updateDemoOrderStatus(id: string, status: string) {
  const orders = getDemoOrders().map((order) => (
    order.id === id ? { ...order, status } : order
  ));
  writeJson(ORDERS_KEY, orders);
}
