/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Button, Calendar, Progress, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useRootStore } from "../stores/RootStore";
import JoinModal from "./JoinModal";
import CreateCourseModal from "./CreateCourseModal";
import { observer } from "mobx-react-lite";

const PageWrapper = styled.div`
  padding: 24px;
  background: rgb(226, 241, 255);
  min-height: 100vh;
`;

const TopBanner = styled.div`
  background: rgb(186, 217, 252);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const BannerContent = styled.div`
  max-width: 60%;
`;

const BannerTitle = styled.h2`
  color: #1a1a2e;
  margin-bottom: 16px;
`;

const StartButton = styled(Button)`
  border: none;
  height: 40px;
  padding: 0 24px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
`;

const ProgressSection = styled.div`
  margin-bottom: 24px;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const CourseCard = styled(Card)`
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
  .ant-card-body {
    padding: 16px;
  }
`;

const StyledProgress = styled(Progress)`
  .ant-progress-inner {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ArticleCard = styled(Card)`
  border-radius: 12px;
  .ant-card-body {
    padding: 16px;
  }
`;

const UpcomingCourse = styled(Card)`
  border-radius: 12px;
  margin-bottom: 16px;
  .ant-card-body {
    padding: 16px;
  }
`;

const CourseTitle = styled.h3`
  color: #1a1a2e;
  margin-bottom: 8px;
`;

const CourseDescription = styled.p`
  color: #666;
  font-size: 14px;
`;

const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
  color: #666;
  font-size: 14px;
`;

export const Courses = observer(() => {
  const navigate = useNavigate();
  const { userStore, authStore, courseStore } = useRootStore();

  // Моковые данные для курсов (прогресс пользователя)
  const courses = [
    {
      id: 1,
      title: "Adobe Photoshop для начинающих",
      progress: 86,
      background: "#e6e9ff",
      strokeColor: "#1a1a2e",
    },
    {
      id: 2,
      title: "C нуля в Game Illustration",
      progress: 32,
      background: "#ffe6d5",
      strokeColor: "#ff7a45",
    },
    {
      id: 3,
      title: "Просто о сложном: 3Ds MAX",
      progress: 9,
      background: "#ffe6f6",
      strokeColor: "#ff1493",
    },
  ];

  // Моковые данные для статей
  const articles = [
    {
      id: 1,
      title: "Фильтры и эффекты",
      tag: "Практика",
      duration: "20 мин",
    },
    {
      id: 2,
      title: "Создание окружений",
      tag: "Теория",
      duration: "1 час",
    },
  ];

  // Моковые данные для ближайшего курса (для присоединения)
  const upcomingCourse = {
    id: 1,
    title: "Где искать вдохновение в 21 веке?",
    description:
      "Этот курс поможет вам открыть для себя разнообразные источники вдохновения, использующих современные технологии. Мы рассмотрим, как использовать социальные сети, онлайн-платформы и виртуальные сообщества для поиска идей.",
    duration: "2 месяца",
    sessions: "15 занятий",
    price: "$24.99",
    author: "John Doe",
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  const handleBannerClick = () => {
    navigate("/courses/1");
  };

  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [isCreateCourseModalVisible, setIsCreateCourseModalVisible] =
    useState(false);

  const openJoinModal = () => {
    setIsJoinModalVisible(true);
  };

  const handleJoinConfirm = () => {
    console.log("Пользователь присоединился к курсу");
    setIsJoinModalVisible(false);
  };

  const handleJoinCancel = () => {
    setIsJoinModalVisible(false);
  };

  const openCreateCourseModal = () => {
    setIsCreateCourseModalVisible(true);
  };

  const handleCreateCourseSubmit = async (data: any) => {
    try {
      await courseStore.createCourse(data);
      setIsCreateCourseModalVisible(false);
      // Здесь можно обновить список курсов, если он используется
    } catch (error) {
      console.error("Ошибка создания курса:", error);
    }
  };
  useEffect(() => {
    if (authStore.user) {
      userStore.fetchUser(authStore.user.id);
    }
  }, [authStore.user, userStore]);
  console.log("authStore.user", authStore.user);

  return (
    <PageWrapper>
      <TopBanner>
        <BannerContent>
          <BannerTitle>
            Вы уже видели новый курс по AI Design, который вышел?
          </BannerTitle>
          <StartButton type="primary" onClick={handleBannerClick}>
            Узнать подробнее
          </StartButton>
        </BannerContent>
      </TopBanner>

      {/* Если пользователь - ментор, показываем кнопку создания курса */}
      {userStore.user && userStore.user?.role === "mentor" && (
        <Button
          type="primary"
          onClick={openCreateCourseModal}
          style={{ marginBottom: 24 }}
        >
          Создать курс
        </Button>
      )}

      <GridContainer>
        <div>
          <ProgressSection>
            <h2>Ваш прогресс</h2>
            <CourseGrid>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  style={{ background: course.background }}
                  onClick={() => handleCourseClick(course.id + 1)}
                >
                  <CourseTitle>{course.title}</CourseTitle>
                  <StyledProgress
                    percent={course.progress}
                    showInfo={false}
                    strokeColor={course.strokeColor}
                  />
                </CourseCard>
              ))}
            </CourseGrid>
          </ProgressSection>

          <ArticleGrid>
            {articles.map((article) => (
              <ArticleCard key={article.id}>
                <CourseTitle>{article.title}</CourseTitle>
                <Tag color="blue">{article.tag}</Tag>
                <span style={{ marginLeft: 8 }}>{article.duration}</span>
              </ArticleCard>
            ))}
          </ArticleGrid>
        </div>

        <div>
          <Calendar fullscreen={false} />
          <h2 style={{ marginTop: 24 }}>Ближайшие курсы</h2>
          <UpcomingCourse>
            <CourseTitle>{upcomingCourse.title}</CourseTitle>
            <CourseDescription>{upcomingCourse.description}</CourseDescription>
            <CourseMeta>
              <span>{upcomingCourse.duration}</span>
              <span>{upcomingCourse.sessions}</span>
            </CourseMeta>
            <Button
              type="primary"
              style={{ marginTop: 16 }}
              block
              onClick={openJoinModal}
            >
              Присоединиться к курсу
            </Button>
            <JoinModal
              visible={isJoinModalVisible}
              onCancel={handleJoinCancel}
              onSubmit={handleJoinConfirm}
              course={upcomingCourse}
            />
          </UpcomingCourse>
        </div>
      </GridContainer>

      <CreateCourseModal
        visible={isCreateCourseModalVisible}
        onCancel={() => setIsCreateCourseModalVisible(false)}
        onSubmit={handleCreateCourseSubmit}
      />
    </PageWrapper>
  );
});
