// src/components/home/PromoBlock.tsx
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import promo from "../../assets/home/promo.jpg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PromoBlockContainer = styled.div`
  animation: ${fadeIn} 2s ease;
  width: 100%;
  position: relative;
  margin-top: 24px;
`;

const PromoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  overflow: hidden;
  height: 500px;
  background: #fff; /* белый фон для карточки */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: relative;
`;

const BackgroundCard = styled.div`
  position: absolute;
  width: 250px;
  height: 100%;
  background-color: rgb(33, 70, 116);
  border-radius: 20px;
  max-height: 350px;
  z-index: 5;
  transition: transform 0.5s ease;
  margin-right: 70px;
  margin-bottom: 70px;
`;

const ForegroundImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  max-height: 350px;
  transition: transform 0.5s ease;
  position: relative;
  z-index: 10;
`;

const TextContainer = styled.div`
  flex: 2;
  padding: 20px;
  color: #1a1a2e; /* темный цвет текста */
  background: #fff;
  border-radius: 20px;
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 10px;
  }
`;

const Title = styled.h3`
  color: #1a1a2e;
  margin-bottom: 8px;
  font-size: 1.8em;
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
  color: #1a1a2e;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const PromoBlock: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (imgRef.current && cardRef.current) {
      if (isVisible) {
        imgRef.current.style.transform = "rotate(5deg) scale(1.1)";
        cardRef.current.style.transform = "rotate(-5deg) scale(1.05)";
      } else {
        imgRef.current.style.transform = "rotate(0deg) scale(1)";
        cardRef.current.style.transform = "rotate(0deg) scale(1)";
      }
    }
  }, [isVisible]);

  return (
    <PromoBlockContainer>
      <PromoContainer>
        <ImageContainer>
          <BackgroundCard ref={cardRef} />
          <ForegroundImage src={promo} alt="Промо" ref={imgRef} />
        </ImageContainer>
        <TextContainer>
          <Title>Преобразите ваше творческое пространство</Title>
          <Description>
            Мы – web - платформа для творчества и сотрудничества для дизайнеров
            и других творческих личностей.
          </Description>
          <List>
            <ListItem>Индивидуальные профили и творческие работы</ListItem>
            <ListItem>Образовательные ресурсы и менторская поддержка</ListItem>
            <ListItem>Сообщества и группы для взаимодействия</ListItem>
            <ListItem>Контактная информация для связи</ListItem>
          </List>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/community")}
          >
            Присоединяйтесь к нашему сообществу
          </Button>
        </TextContainer>
      </PromoContainer>
    </PromoBlockContainer>
  );
};

export default PromoBlock;
