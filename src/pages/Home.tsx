// src/components/Home.tsx
import React from "react";
import styled from "styled-components";
import MainBanner from "../components/MainBanner";
import PromoBlock from "../components/home/PromoBlock";
import ParticipantsWorks from "../components/home/ParticipantsWorks";

const PageWrapper = styled.div`
  padding: 24px;
  background: rgb(226, 241, 255);
  min-height: 100vh;
`;

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentSection = styled.section`
  padding: 50px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  margin-top: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  p {
    font-size: 1.1em;
  }
`;

const Home: React.FC = () => (
  <PageWrapper>
    <HomeContainer>
      <MainBanner />
      <ContentSection>
        <h2 style={{ fontSize: "1.8em", marginTop: 0 }}>
          Добро пожаловать на InkFlow!
        </h2>
        <p>
          Здесь вы можете найти вдохновение, сотрудничать с другими творческими
          личностями и развивать свои навыки.
        </p>
        <p>
          Узнайте больше о наших предложениях и присоединяйтесь к нашему
          сообществу!
        </p>
      </ContentSection>
      <PromoBlock />
      <ParticipantsWorks />
    </HomeContainer>
  </PageWrapper>
);

export default Home;
