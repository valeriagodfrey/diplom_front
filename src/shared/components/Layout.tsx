import React, { PropsWithChildren, useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import CustomHeader from "./Header";
import Footer from "./Footer";
import { useRootStore } from "../../stores/RootStore";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CustomLayout = ({ children }: PropsWithChildren) => {
  const { authStore } = useRootStore();

  useEffect(() => {
    authStore.checkAuth(); // Проверяем токен при загрузке
  }, [authStore]);
  return (
    <StyledLayout>
      <CustomHeader />
      <Content
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer />
    </StyledLayout>
  );
};

export default CustomLayout;
