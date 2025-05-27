import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ResourcesPage from '../pages/ResourcesPage';
import EcoPracticesPage from '../pages/EcoPracticesPage';
import ConsumptionPage from '../pages/ConsumptionPage';
import CommunityPage from '../pages/CommunityPage';
import ToolsPage from '../pages/ToolsPage';
import ContactPage from '../pages/ContactPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import ForgotPassword from '../pages/ForgotPassword';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboard from '../pages/AdminDashboard';

export default function AppRoutes() {
  const [adminToken, setAdminToken] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/eco-practices" element={<EcoPracticesPage />} />
      <Route path="/consumption" element={<ConsumptionPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin" element={
        adminToken
          ? <AdminDashboard onLogout={() => setAdminToken(null)} />
          : <AdminLoginPage onLogin={setAdminToken} />
      } />
    </Routes>
  );
}