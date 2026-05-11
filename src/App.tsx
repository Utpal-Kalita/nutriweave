/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import HowItWorks from './pages/HowItWorks';
import PrioritySelection from './pages/PrioritySelection';
import MatchResult from './pages/MatchResult';
import CustomizeOrder from './pages/CustomizeOrder';
import Impact from './pages/Impact';
import Profile from './pages/Profile';
import NutritionalScale from './pages/NutritionalScale';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './pages/Auth';

import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes with standard Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/priority" element={<PrioritySelection />} />
              <Route path="/match" element={<MatchResult />} />
              <Route path="/scale" element={<NutritionalScale />} />
              
              {/* Protected Routes */}
              <Route path="/customize" element={<ProtectedRoute><CustomizeOrder /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/impact" element={<ProtectedRoute><Impact /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/order-success" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Route>

            {/* Admin Routes (Hidden) */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
