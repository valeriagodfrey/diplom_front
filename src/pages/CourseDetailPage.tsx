import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";

const PageWrapper = styled.div`
  padding: 24px;
  background: rgb(226, 241, 255);
  min-height: 100vh;
`;

const CourseTitle = styled.h1`
  color: #1a1a2e;
  margin-bottom: 16px;
`;

const CourseDescription = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 24px;
`;

const CourseImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
`;

const CourseContent = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.6;
`;

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const courses = [
    {
      id: 1,
      title: "Adobe Photoshop для начинающих",
      progress: 86,
      background: "#e6e9ff",
      strokeColor: "#1a1a2e",
      description:
        "Курс, который познакомит вас с основами работы в Adobe Photoshop: от базовых инструментов до создания сложных композиций.",
      image: "https://via.placeholder.com/800x400?text=Photoshop+Course",
      content: `
        <p>В этом курсе вы научитесь:</p>
        <ul>
          <li>Основам работы в Photoshop</li>
          <li>Работе со слоями и масками</li>
          <li>Применению фильтров и эффектов</li>
          <li>Коррекции цвета и освещения</li>
        </ul>
      `,
    },
    {
      id: 2,
      title: "C нуля в Game Illustration",
      progress: 32,
      background: "#ffe6d5",
      strokeColor: "#ff7a45",
      description:
        "Курс для начинающих иллюстраторов, желающих освоить основы создания иллюстраций для игр.",
      image:
        "https://via.placeholder.com/800x400?text=Game+Illustration+Course",
      content: `
        <p>Курс включает:</p>
        <ul>
          <li>Основы иллюстрации и композиции</li>
          <li>Создание персонажей и окружений</li>
          <li>Цветовую гармонию и освещение</li>
        </ul>
      `,
    },
    {
      id: 3,
      title: "Просто о сложном: 3Ds MAX",
      progress: 9,
      background: "#ffe6f6",
      strokeColor: "#ff1493",
      description:
        "Углубленный курс по 3D-моделированию в 3Ds MAX, который охватывает базовые и продвинутые техники создания 3D-моделей.",
      image: "https://via.placeholder.com/800x400?text=3Ds+MAX+Course",
      content: `
        <p>В программе курса:</p>
        <ul>
          <li>Базовые инструменты моделирования</li>
          <li>Текстурирование и освещение</li>
          <li>Анимация и рендеринг</li>
        </ul>
      `,
    },
  ];

  return (
    <PageWrapper>
      <CourseTitle>{courses[courseId - 1].title}</CourseTitle>
      <CourseDescription>{courses[courseId - 1].description}</CourseDescription>
      <CourseImage
        src={courses[courseId - 1].image}
        alt={courses[courseId - 1].title}
      />
      <CourseContent
        dangerouslySetInnerHTML={{ __html: courses[courseId - 1].content }}
      />
      <Button type="primary" style={{ marginTop: "24px" }}>
        Записаться на курс
      </Button>
    </PageWrapper>
  );
};

export default CourseDetailPage;
