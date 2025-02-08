import React, { useState } from "react";
import styled from "styled-components";
import { Card, Button } from "antd";

const PageWrapper = styled.div`
  padding: 24px;
  background: rgb(226, 241, 255);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(186, 217, 252);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const Categories = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
`;

const Category = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? "#1a1a2e" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  font-weight: bold;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: #1a1a2e;
    color: white;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const Section = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
`;

const GroupCard = styled(Card)`
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  .ant-card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const GroupImage = styled.div`
  height: 80px;
  width: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const GroupInfo = styled.div`
  flex-grow: 1;
  margin-left: 12px;
`;

const categories = [
  "Все",
  "Веб-дизайн",
  "Фотография",
  "Иллюстрация",
  "Анимация",
  "3D-моделирование",
  "Музыка",
  "Фильмография",
];

const groups = [
  {
    name: "UI/UX Design Masters",
    members: "8,500",
    friends: 3,
    category: "Веб-дизайн",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Creative Photographers",
    members: "12,300",
    friends: 2,
    category: "Фотография",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Illustration Hub",
    members: "7,800",
    friends: 5,
    category: "Иллюстрация",
    image: "https://via.placeholder.com/80",
  },
];

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const filteredGroups =
    selectedCategory === "Все"
      ? groups
      : groups.filter((group) => group.category === selectedCategory);

  return (
    <PageWrapper>
      <Header>
        <h2>Откройте для себя новые творческие сообщества</h2>
        <Button type="primary">+ Создать группу</Button>
      </Header>
      <Categories>
        {categories.map((category) => (
          <Category
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Category>
        ))}
      </Categories>
      <GridContainer>
        <Section>
          <h3>Группы</h3>
          {filteredGroups.map((group) => (
            <GroupCard key={group.name}>
              <GroupImage style={{ backgroundImage: `url(${group.image})` }} />
              <GroupInfo>
                <strong>{group.name}</strong>
                <p>
                  {group.friends} друзей • {group.members} участников
                </p>
              </GroupInfo>
              <Button type="default">+ Присоединиться</Button>
            </GroupCard>
          ))}
        </Section>
      </GridContainer>
    </PageWrapper>
  );
};

export default CommunityPage;

// DTO для единицы сообщества
// export class CommunityDTO {
//   constructor(name, members, friends, category, image) {
//     this.name = name;
//     this.members = members;
//     this.friends = friends;
//     this.category = category;
//     this.image = image;
//   }
// }
