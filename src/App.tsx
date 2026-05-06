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

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/selection" element={<PrioritySelection />} />
          <Route path="/match" element={<MatchResult />} />
          <Route path="/scale" element={<NutritionalScale />} />
          <Route path="/order" element={<CustomizeOrder />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-success" element={<Profile />} /> {/* Placeholder to show success state */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
