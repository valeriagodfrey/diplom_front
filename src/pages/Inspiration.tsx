// src/pages/Inspiration.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Card, Button, Select, Input } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import useWorksController from "../controllers/WorksController";
import { observer } from "mobx-react-lite";

const { Option } = Select;
const { Search } = Input;

const PageWrapper = styled.div`
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1f1f1f;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const StyledSearch = styled(Search)`
  width: 300px;
`;

const WorksGrid = styled(Row)`
  margin: -12px;
`;

const WorkCol = styled(Col)`
  padding: 12px;
`;

const WorkCard = styled(Card)`
  .ant-card-cover img {
    aspect-ratio: 1;
    object-fit: cover;
  }
  .ant-card-body {
    padding: 16px;
  }
`;

const CardMeta = styled.div`
  margin-bottom: 16px;
`;

const WorkTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #1f1f1f;
`;

const AuthorName = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const Category = styled.p`
  font-size: 14px;
  color: #8c8c8c;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CreativeGallery = observer(() => {
  const worksController = useWorksController();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Загружаем работы с сервера при монтировании компонента
  useEffect(() => {
    worksController.fetchWorks();
  }, [worksController]);

  const filteredWorks = worksController.works.filter((work) => {
    const matchesFilter =
      filter === "all" || work.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Создавай и вдохновляй</Title>
        <FiltersWrapper>
          <StyledSelect
            defaultValue="all"
            onChange={(value) => setFilter(value as string)}
          >
            <Option value="all">Все категории</Option>
            <Option value="art">Art</Option>
            <Option value="design">Design</Option>
            <Option value="photography">Photography</Option>
          </StyledSelect>
          <StyledSearch
            placeholder="Введите искомого творца..."
            allowClear
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </FiltersWrapper>
        <WorksGrid gutter={24}>
          {filteredWorks.map((work) => (
            <WorkCol key={work.id} span={8}>
              <WorkCard
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      alt={work.title}
                      src={work.image}
                      style={{ width: "100%", height: "300px" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => worksController.toggleFavorite(work.id)}
                    >
                      {work.isFavorite ? (
                        <HeartFilled
                          style={{ fontSize: 24, color: "#ff4d4f" }}
                        />
                      ) : (
                        <HeartOutlined
                          style={{
                            fontSize: 24,
                            color: "#fff",
                            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
                          }}
                        />
                      )}
                    </div>
                  </div>
                }
              >
                <CardMeta>
                  <WorkTitle>{work.title}</WorkTitle>
                  <AuthorName>by {work.author}</AuthorName>
                  <Category>{work.category}</Category>
                </CardMeta>
                <CardActions>
                  <LikeButton
                    type="text"
                    icon={
                      work.isLiked ? (
                        <HeartFilled style={{ color: "#ff4d4f" }} />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    onClick={() => worksController.likeWork(work.id)}
                  >
                    {work.likes}
                  </LikeButton>
                  <Button
                    type="primary"
                    onClick={() => worksController.toggleFavorite(work.id)}
                  >
                    {work.isFavorite ? "Saved" : "Save"}
                  </Button>
                </CardActions>
              </WorkCard>
            </WorkCol>
          ))}
        </WorksGrid>
      </ContentWrapper>
    </PageWrapper>
  );
});
