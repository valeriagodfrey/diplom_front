// src/routes.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CustomLayout from "./shared/components/Layout";
import { RootStoreProvider } from "./stores/RootStore";
import Account from "./pages/Account";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import Toast from "./components/Toast";
import { ConfigProvider } from "antd";
import { ScrollToTop } from "./utils/scroll-to-top";
import { CreativeGallery } from "./pages/Inspiration";

const AppRoutes: React.FC = () => (
  <RootStoreProvider>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(33,70,116)",
        },
        components: {
          Button: {
            colorPrimary: "rgb(33,70,116)",
            colorPrimaryBorder: "rgb(33,70,116)",
            colorPrimaryHover: "rgb(28, 58, 95)",
            colorPrimaryActive: "rgb(33,70,116)",
            colorText: "rgb(33,70,116)",
            colorInfoTextHover: "#ffff",
            colorBorderSecondary: "rgb(33,70,116)",
          },
        },
      }}
    >
      <Router>
        <ScrollToTop />

        <CustomLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/inspiration" element={<CreativeGallery />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/community" element={<Community />} />
          </Routes>
          <Toast />
        </CustomLayout>
      </Router>
    </ConfigProvider>
  </RootStoreProvider>
);

export default AppRoutes;
