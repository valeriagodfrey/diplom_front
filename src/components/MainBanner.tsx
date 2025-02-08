// src/components/MainBanner.tsx
import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import background from "../assets/home/main-banner.png"; // убедитесь, что путь корректный
import { useRootStore } from "../stores/RootStore";

const BannerContainer = styled.div`
  height: 600px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  padding: 0 16px;
  margin: 0; /* убираем отступы, если они есть */
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.61); /* затемнение */
    z-index: -1;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5em;
  margin: 0.5em 0;
  text-align: center;
`;

const Description = styled.p`
  color: #fff;
  font-size: 1.5em;
  max-width: 800px;
  text-align: center;
  margin: 0.5em 0 2em;
`;

const CustomButton = styled(Button)`
  background-color: rgb(33, 70, 116);
  color: #fff;
  height: 40px;
  padding: 0 24px;
`;

const MainBanner: React.FC = () => {
  const { authStore } = useRootStore();
  return (
    <BannerContainer>
      <Title>Твори. Делись. Вдохновляй.</Title>
      <Description>
        Платформа, где ваши идеи обретают форму и находят отклик.
      </Description>
      <CustomButton
        type="primary"
        size="large"
        onClick={() => authStore.setRegisterModalVisible(true)}
      >
        Узнать Больше
      </CustomButton>
    </BannerContainer>
  );
};

export default MainBanner;
