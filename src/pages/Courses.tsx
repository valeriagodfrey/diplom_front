import styled from "styled-components";
import { Card, Button, Calendar, Progress, Tag } from "antd";

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

const Courses = () => {
  return (
    <PageWrapper>
      <TopBanner>
        <BannerContent>
          <BannerTitle>
            Вы уже видели новый курс по AI Design, который вышел?
          </BannerTitle>
          <StartButton type="primary">Узнать подробнее</StartButton>
        </BannerContent>
      </TopBanner>

      <GridContainer>
        <div>
          <ProgressSection>
            <h2>Ваш прогресс</h2>
            <CourseGrid>
              <CourseCard style={{ background: "#e6e9ff" }}>
                <CourseTitle>Adobe Photoshop для начинающих</CourseTitle>
                <StyledProgress
                  percent={86}
                  showInfo={false}
                  strokeColor="#1a1a2e"
                />
              </CourseCard>
              <CourseCard style={{ background: "#ffe6d5" }}>
                <CourseTitle>C нуля в Game Illustration</CourseTitle>
                <StyledProgress
                  percent={32}
                  showInfo={false}
                  strokeColor="#ff7a45"
                />
              </CourseCard>
              <CourseCard style={{ background: "#ffe6f6" }}>
                <CourseTitle>Просто о сложном: 3Ds MAX</CourseTitle>
                <StyledProgress
                  percent={9}
                  showInfo={false}
                  strokeColor="#ff1493"
                />
              </CourseCard>
            </CourseGrid>
          </ProgressSection>

          <ArticleGrid>
            <ArticleCard>
              <CourseTitle>Фильтры и эффекты</CourseTitle>
              <Tag color="blue">Практика</Tag>
              <span style={{ marginLeft: 8 }}>20 мин</span>
            </ArticleCard>
            <ArticleCard>
              <CourseTitle>Создание окружений</CourseTitle>
              <Tag color="blue">Теория</Tag>
              <span style={{ marginLeft: 8 }}>1 час</span>
            </ArticleCard>
          </ArticleGrid>
        </div>

        <div>
          <Calendar fullscreen={false} />
          <h2 style={{ marginTop: 24 }}>Ближайшие курсы</h2>
          <UpcomingCourse>
            <CourseTitle>Где искать вдохновение в 21 веке?</CourseTitle>
            <CourseDescription>
              Этот курс поможет вам открыть для себя разнообразные источники
              вдохновения, которые соответствуют современным реалиям. Мы
              рассмотрим, как использовать социальные сети, онлайн-платформы и
              виртуальные сообщества для поиска идей.
            </CourseDescription>
            <CourseMeta>
              <span>2 месяца</span>
              <span>15 занятий</span>
            </CourseMeta>
            <Button type="primary" style={{ marginTop: 16 }} block>
              Купить курс $24.99
            </Button>
          </UpcomingCourse>
        </div>
      </GridContainer>
    </PageWrapper>
  );
};

export default Courses;
