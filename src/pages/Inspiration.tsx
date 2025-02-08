/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styled from "styled-components";
import { Card, Button, Select, Input, Row, Col } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import image from "../assets/image1.jpg";
const { Option } = Select;

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

const StyledSearch = styled(Input.Search)`
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

const FavoriteIcon = styled.div<{ isFavorite: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;

  .anticon {
    font-size: 24px;
    color: ${(props) => (props.isFavorite ? "#ff4d4f" : "#fff")};
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.3));
    cursor: pointer;
  }
`;

const mockData = [
  {
    id: 1,
    title: "Abstract Painting",
    category: "Art",
    image: "assets/image1.jpg",
    likes: 120,
    isLiked: false,
    isFavorite: false,
    author: "Elena Smith",
  },
  {
    id: 2,
    title: "Modern Design",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 200,
    isLiked: false,
    isFavorite: false,
    author: "Mike Johnson",
  },
  {
    id: 3,
    title: "Nature Photography",
    category: "Photography",
    image: "/api/placeholder/400/400",
    likes: 150,
    isLiked: false,
    isFavorite: false,
    author: "Sarah Green",
  },
  {
    id: 4,
    title: "Digital Illustration",
    category: "Art",
    image: "/api/placeholder/400/400",
    likes: 95,
    isLiked: false,
    isFavorite: false,
    author: "David Lee",
  },
  {
    id: 5,
    title: "Creative Typography",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 180,
    isLiked: false,
    isFavorite: false,
    author: "Anna White",
  },
  {
    id: 6,
    title: "Portrait Photography",
    category: "Photography",
    image: "/api/placeholder/400/400",
    likes: 140,
    isLiked: false,
    isFavorite: false,
    author: "John Black",
  },
  {
    id: 7,
    title: "Surreal Art",
    category: "Art",
    image: "/api/placeholder/400/400",
    likes: 220,
    isLiked: false,
    isFavorite: false,
    author: "Lisa Chen",
  },
  {
    id: 8,
    title: "UI/UX Concepts",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 175,
    isLiked: false,
    isFavorite: false,
    author: "Mark Wilson",
  },
  {
    id: 9,
    title: "Landscape Shots",
    category: "Photography",
    image: "/api/placeholder/400/400",
    likes: 130,
    isLiked: false,
    isFavorite: false,
    author: "Emma Davis",
  },
  {
    id: 10,
    title: "Acrylic Canvas",
    category: "Art",
    image: "/api/placeholder/400/400",
    likes: 115,
    isLiked: false,
    isFavorite: false,
    author: "Tom Brown",
  },
  {
    id: 11,
    title: "Brand Identity",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 190,
    isLiked: false,
    isFavorite: false,
    author: "Kate Miller",
  },
  {
    id: 12,
    title: "Street Photography",
    category: "Photography",
    image: "/api/placeholder/400/400",
    likes: 125,
    isLiked: false,
    isFavorite: false,
    author: "Peter Yang",
  },
  {
    id: 13,
    title: "Concept Art",
    category: "Art",
    image: "/api/placeholder/400/400",
    likes: 205,
    isLiked: false,
    isFavorite: false,
    author: "Nina Park",
  },
  {
    id: 14,
    title: "Minimalist Design",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 165,
    isLiked: false,
    isFavorite: false,
    author: "Alex Gray",
  },
  {
    id: 15,
    title: "Macro Photography",
    category: "Photography",
    image: "/api/placeholder/400/400",
    likes: 135,
    isLiked: false,
    isFavorite: false,
    author: "Chris Wong",
  },
  {
    id: 16,
    title: "Cubist Art",
    category: "Art",
    image: "/api/placeholder/400/400",
    likes: 110,
    isLiked: false,
    isFavorite: false,
    author: "Rachel Adams",
  },
  {
    id: 17,
    title: "Packaging Design",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 185,
    isLiked: false,
    isFavorite: false,
    author: "James Martin",
  },
  {
    id: 18,
    title: "Urban Photography",
    category: "Photography",
    image: "/api/placeholder/400/400",
    likes: 145,
    isLiked: false,
    isFavorite: false,
    author: "Sofia Garcia",
  },
  {
    id: 19,
    title: "Pop Art",
    category: "Art",
    image: "/api/placeholder/400/400",
    likes: 125,
    isLiked: false,
    isFavorite: false,
    author: "Daniel Kim",
  },
  {
    id: 20,
    title: "Interactive Design",
    category: "Design",
    image: "/api/placeholder/400/400",
    likes: 195,
    isLiked: false,
    isFavorite: false,
    author: "Maria Lopez",
  },
];

const CreativeGallery = () => {
  const [works, setWorks] = useState(mockData);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleLike = (id: any) => {
    setWorks(
      works.map((work) => {
        if (work.id === id) {
          return {
            ...work,
            isLiked: !work.isLiked,
            likes: work.isLiked ? work.likes - 1 : work.likes + 1,
          };
        }
        return work;
      })
    );
  };

  const handleFavorite = (id: any) => {
    setWorks(
      works.map((work) => {
        if (work.id === id) {
          return { ...work, isFavorite: !work.isFavorite };
        }
        return work;
      })
    );
  };

  const filteredWorks = works.filter((work) => {
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
                      src={image}
                      style={{ width: "100%", height: "300px" }}
                    />
                    <FavoriteIcon
                      isFavorite={work.isFavorite}
                      onClick={() => handleFavorite(work.id)}
                    >
                      {work.isFavorite ? <HeartFilled /> : <HeartOutlined />}
                    </FavoriteIcon>
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
                    onClick={() => handleLike(work.id)}
                  >
                    {work.likes}
                  </LikeButton>

                  <Button
                    type="primary"
                    onClick={() => handleFavorite(work.id)}
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
};

export default CreativeGallery;
