import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import aicourse from "../assets/ai-course.jpg";
import course2 from "../assets/course-2.jpg";
import course3 from "../assets/course-3.jpg";
import courseBanner1 from "../assets/course-banner-1.jpg";
import courseBanner2 from "../assets/course-banner-2.jpg";
import courseBanner3 from "../assets/course-banner-3.jpg";
import courseBanner4 from "../assets/course-banner-4.jpg";
import CourseJoinModal from "./CourseJoinModal";

const PageWrapper = styled.div`
  padding: 24px;
  background: rgb(226, 241, 255);
  min-height: 100vh;
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

const CourseDetailContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

  // Преобразуем courseId в число и вычисляем индекс курса
  const numericCourseId = Number(courseId);
  const courseIndex = numericCourseId - 1;
  const courses = [
    {
      id: 1,
      title: "Новый курс по AI Design",
      progress: 0,
      background: "#f5f7fa",
      strokeColor: "#1a1a2e",
      description: "",
      image: `${courseBanner1}`,
      content: `
        <div class="course-container" style="font-family: 'Arial', sans-serif; background: #f5f7fa; color: #333; padding: 14px; max-width: 1000px; margin: 0 auto;">
          <!-- Header -->
          <header style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 2.8em; color: #1a1a2e; margin-bottom: 0.5em;">Новый курс по AI Design</h1>
            <p style="font-size: 1.2em; color: #555;">Погрузитесь в мир искусственного интеллекта и современного дизайна</p>
          </header>
          <!-- Overview Section -->
          <section style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin-bottom: 32px;">
            <div style="flex: 1; min-width: 300px;">
              <img src="${aicourse}" alt="AI Design Course" style="width: 100%; border-radius: 12px; object-fit: cover;" />
            </div>
            <div style="flex: 1; min-width: 300px;">
              <p style="font-size: 1.1em; margin-bottom: 16px;">
                Откройте для себя передовые методы в области дизайна с использованием AI.
              </p>
              <ul style="font-size: 1.1em; line-height: 1.6; margin-left: 20px;">
                <li>Изучите алгоритмы генеративного дизайна</li>
                <li>Освойте инструменты AI для визуализации идей</li>
                <li>Создавайте уникальные концепции с помощью AI</li>
                <li>Реализуйте практические проекты</li>
              </ul>
            </div>
          </section>
          <!-- Detailed Content -->
          <section style="margin-bottom: 32px; font-size: 1.1em; line-height: 1.6;">
            <p>Курс включает подробные лекции, практические задания и кейс-стади, которые помогут вам освоить принципы AI Design и применять их в реальных проектах.</p>
            <p>Присоединяйтесь к курсу и станьте частью будущего дизайна!</p>
          </section>
          <!-- Footer -->
          <footer style="text-align: center;">
            <button id="join-course-btn" style="background: #1a1a2e; color: #fff; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 8px; cursor: pointer;">
              Записаться на курс
            </button>
          </footer>
        </div>
      `,
    },
    {
      id: 2,
      title: "Adobe Photoshop для начинающих",
      progress: 86,
      background: "#e6e9ff",
      strokeColor: "#1a1a2e",
      description: "",
      image: `${courseBanner2}`,
      content: `
        <div class="course-container" style="font-family: 'Arial', sans-serif; background: #e6e9ff; color: #333; padding: 14px; max-width: 1000px; margin: 0 auto;">
          <!-- Header -->
          <header style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 2.8em; color: #1a1a2e; margin-bottom: 0.5em;">Adobe Photoshop для начинающих</h1>
            <p style="font-size: 1.2em; color: #555;">Освойте базовые техники редактирования изображений</p>
          </header>
          <!-- Overview Section -->
          <section style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin-bottom: 32px;">
            <div style="flex: 1; min-width: 300px;">
              <img src="${course2}" alt="Photoshop Course" style="width: 100%; border-radius: 12px; object-fit: cover;" />
            </div>
            <div style="flex: 1; min-width: 300px;">
              <p style="font-size: 1.1em; margin-bottom: 16px;">
                Изучите основы работы в Photoshop, научитесь корректировать и улучшать изображения.
              </p>
              <ul style="font-size: 1.1em; line-height: 1.6; margin-left: 20px;">
                <li>Базовые инструменты редактирования</li>
                <li>Работа со слоями и масками</li>
                <li>Применение фильтров и эффектов</li>
                <li>Коррекция цвета и освещения</li>
              </ul>
            </div>
          </section>
          <!-- Detailed Content -->
          <section style="margin-bottom: 32px; font-size: 1.1em; line-height: 1.6;">
            <p>Курс поможет вам быстро освоить Photoshop и применять полученные знания в дизайне и фотографии.</p>
          </section>
          <!-- Footer -->
          <footer style="text-align: center;">
            <button id="join-course-btn" style="background: #1a1a2e; color: #fff; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 8px; cursor: pointer;">
              Записаться на курс
            </button>
          </footer>
        </div>
      `,
    },
    {
      id: 3,
      title: "C нуля в Game Illustration",
      progress: 32,
      background: "#ffe6d5",
      strokeColor: "#ff7a45",
      description: "",
      image: `${courseBanner3}`,
      content: `
        <div class="course-container" style="font-family: 'Arial', sans-serif; background: #ffe6d5; color: #333; padding: 14px; max-width: 1000px; margin: 0 auto;">
          <!-- Header -->
          <header style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 2.8em; color: #1a1a2e; margin-bottom: 0.5em;">C нуля в Game Illustration</h1>
            <p style="font-size: 1.2em; color: #555;">Начните создавать визуальные концепции для игр</p>
          </header>
          <!-- Overview Section -->
          <section style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin-bottom: 32px;">
            <div style="flex: 1; min-width: 300px;">
              <img src="${course3}" alt="Game Illustration Course" style="width: 100%; border-radius: 12px; object-fit: cover;" />
            </div>
            <div style="flex: 1; min-width: 300px;">
              <p style="font-size: 1.1em; margin-bottom: 16px;">
                Изучите основы создания иллюстраций для игр, от концепта до финальной визуализации.
              </p>
              <ul style="font-size: 1.1em; line-height: 1.6; margin-left: 20px;">
                <li>Основы иллюстрации и композиции</li>
                <li>Создание персонажей и окружений</li>
                <li>Цветовая гармония и освещение</li>
              </ul>
            </div>
          </section>
          <!-- Detailed Content -->
          <section style="margin-bottom: 32px; font-size: 1.1em; line-height: 1.6;">
            <p>Курс рассчитан на начинающих, желающих освоить основы игровой иллюстрации и создать свои первые работы.</p>
          </section>
          <!-- Footer -->
          <footer style="text-align: center;">
            <button id="join-course-btn" style="background: #1a1a2e; color: #fff; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 8px; cursor: pointer;">
              Записаться на курс
            </button>
          </footer>
        </div>
      `,
    },
    {
      id: 4,
      title: "Просто о сложном: 3Ds MAX",
      progress: 9,
      background: "#ffe6f6",
      strokeColor: "#ff1493",
      description: "",
      image: `${courseBanner4}`,
      content: `
        <div class="course-container" style="font-family: 'Arial', sans-serif; background: rgba(198, 219, 250, 0.72); color: #333; padding: 14px; max-width: 1000px; margin: 0 auto;">
          <!-- Header -->
          <header style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 2.8em; color: #1a1a2e; margin-bottom: 0.5em;">Просто о сложном: 3Ds MAX</h1>
            <p style="font-size: 1.2em; color: #555;">Изучите продвинутые техники 3D-моделирования</p>
          </header>
          <!-- Overview Section -->
          <section style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center; margin-bottom: 32px;">
            <div style="flex: 1; min-width: 300px;">
              <img src="${courseBanner4}" alt="3Ds MAX Course" style="width: 100%; border-radius: 12px; object-fit: cover;" />
            </div>
            <div style="flex: 1; min-width: 300px;">
              <p style="font-size: 1.1em; margin-bottom: 16px;">
                Освойте как базовые, так и продвинутые техники моделирования, текстурирования и рендеринга в 3Ds MAX.
              </p>
              <ul style="font-size: 1.1em; line-height: 1.6; margin-left: 20px;">
                <li>Базовые инструменты моделирования</li>
                <li>Текстурирование и освещение</li>
                <li>Анимация и рендеринг</li>
              </ul>
            </div>
          </section>
          <!-- Detailed Content -->
          <section style="margin-bottom: 32px; font-size: 1.1em; line-height: 1.6;">
            <p>Курс охватывает весь спектр навыков 3D-моделирования, позволяя создавать профессиональные 3D-проекты с нуля.</p>
          </section>
          <!-- Footer -->
          <footer style="text-align: center;">
            <button id="join-course-btn" style="background: #1a1a2e; color: #fff; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 8px; cursor: pointer;">
              Записаться на курс
            </button>
          </footer>
        </div>
      `,
    },
  ];

  const course = courses[courseIndex];
  useEffect(() => {
    const container = contentRef.current;
    if (container) {
      const joinButton = container.querySelector("#join-course-btn");
      if (joinButton) {
        const handleJoinClick = () => {
          setIsJoinModalVisible(true);
        };
        joinButton.addEventListener("click", handleJoinClick);
        return () => {
          joinButton.removeEventListener("click", handleJoinClick);
        };
      }
    }
  }, [course]);
  if (courseIndex < 0 || courseIndex >= courses.length) {
    return <div>Курс не найден</div>;
  }

  return (
    <PageWrapper>
      <CourseDetailContainer>
        <CourseImage src={course.image} alt={course.title} />
        <CourseContent
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: course.content }}
        />
      </CourseDetailContainer>
      <CourseJoinModal
        visible={isJoinModalVisible}
        onCancel={() => setIsJoinModalVisible(false)}
        onSubmit={() => {
          console.log("Пользователь присоединился к курсу");
          setIsJoinModalVisible(false);
        }}
        course={{
          title: course.title,
          description: course.description,
          duration: "3 месяца", // здесь можно добавить реальные данные
          lessons: "20 занятий",
          author: "John Doe",
        }}
      />
    </PageWrapper>
  );
};

export default CourseDetailPage;
