import React, { PropsWithChildren } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import CustomHeader from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CustomLayout = ({ children }: PropsWithChildren) => {
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
