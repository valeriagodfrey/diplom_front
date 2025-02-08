// src/components/home/ParticipantsWorksCarousel.tsx
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

// Импортируем CSS для слайдера (убедитесь, что slick-carousel установлен)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Импорт изображений участников — замените пути на свои изображения
import participant1 from "../../assets/home/project-1.png";
import participant2 from "../../assets/home/project-2.png";
import participant3 from "../../assets/home/project-3.png";
import participant4 from "../../assets/home/project-4.png";
import participant5 from "../../assets/home/project-5.png";

const CarouselContainer = styled.div`
  margin-top: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: visible; /* стрелки будут видны */
`;

const Title = styled.h2`
  text-align: center;
  color: #1a1a2e;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 16px;
  font-size: 16px;
  color: #666;
`;

const SlideWrapper = styled.div`
  padding: 0 5px; /* 5px слева и справа, итого 10px между слайдами */
  box-sizing: border-box;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
`;

const CTAContainer = styled.div`
  text-align: center;
  margin-top: 16px;
`;

const CTAButton = styled(Button)`
  border-radius: 6px;
  background-color: rgb(33, 70, 116);
  border-color: rgb(33, 70, 116);
  color: #fff;
  &:hover {
    background-color: rgb(33, 70, 116);
    border-color: rgb(33, 70, 116);
  }
`;

const ParticipantsWorksCarousel: React.FC = () => {
  const navigate = useNavigate();

  // Массив изображений участников
  const images = [
    participant1,
    participant2,
    participant3,
    participant4,
    participant5,
  ];

  const settings = {
    infinite: true, // Бесконечная карусель
    slidesToShow: 4, // Показываем 4 слайда за раз (на всю ширину блока)
    draggable: true, // Разрешена прокрутка мышью
    swipeToSlide: true, // Плавный переход по жесту пользователя
    autoplay: true,
    autoplaySpeed: 2000, // Интервал переключения
    speed: 600, // Скорость анимации переключения
    cssEase: "ease-out", // Плавное завершение анимации
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Title>Работы наших участников</Title>
      <Subtitle>
        Просмотрите лучшие проекты наших талантливых участников и вдохновитесь
        их творчеством.
      </Subtitle>
      <Slider {...settings}>
        {images.map((img, index) => (
          <SlideWrapper key={index}>
            <SlideImage src={img} alt={`Работа участника ${index + 1}`} />
          </SlideWrapper>
        ))}
      </Slider>
      <CTAContainer>
        <CTAButton
          type="primary"
          size="large"
          onClick={() => navigate("/inspiration")}
        >
          Смотреть все работы
        </CTAButton>
      </CTAContainer>
    </CarouselContainer>
  );
};

export default ParticipantsWorksCarousel;
