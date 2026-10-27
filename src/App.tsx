/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { MotionConfig } from 'motion/react';

import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

const Welcome = lazy(() => import('./pages/Welcome'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const PrioritySelection = lazy(() => import('./pages/PrioritySelection'));
const MatchResult = lazy(() => import('./pages/MatchResult'));
const CustomizeOrder = lazy(() => import('./pages/CustomizeOrder'));
const Impact = lazy(() => import('./pages/Impact'));
const Profile = lazy(() => import('./pages/Profile'));
const NutritionalScale = lazy(() => import('./pages/NutritionalScale'));
const Cart = lazy(() => import('./pages/Cart'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));

function AppLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-surface-container-high border-t-primary" />
        <span className="font-display text-sm font-semibold text-on-surface-variant">Loading Nutrifibe…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <Suspense fallback={<AppLoading />}>
              <Routes>
                {/* Public Routes with standard Layout */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/priority" element={<ProtectedRoute><PrioritySelection /></ProtectedRoute>} />
                  <Route path="/match" element={<ProtectedRoute><MatchResult /></ProtectedRoute>} />
                  <Route path="/scale" element={<NutritionalScale />} />

                  {/* Protected Routes */}
                  <Route path="/customize" element={<ProtectedRoute><CustomizeOrder /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/impact" element={<ProtectedRoute><Impact /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/order-success" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin Routes (Hidden) */}
                <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MotionConfig>
      </CartProvider>
    </AuthProvider>
  );
}
