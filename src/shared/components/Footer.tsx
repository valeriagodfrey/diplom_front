import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const FooterContainer = styled.div`
  background-color: rgb(47, 76, 112);
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
`;

const Section = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  a {
    color: white;
    font-size: 24px;
  }
`;

const Copyright = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Section>
        <Title>INKFLOW</Title>
        <Description>
          Мы – web - платформа для творчества и сотрудничества для дизайнеров и
          других творческих личностей. В функционал входит: Профили и творческие
          работы, образовательные материалы и менторство, сообщества и группы.
        </Description>
        <SocialIcons>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterOutlined />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined />
          </a>
        </SocialIcons>
      </Section>
      <Section>
        <Title>Ссылки</Title>
        <List>
          <ListItem>
            <Link to="/">Главная</Link>
          </ListItem>
          <ListItem>
            <Link to="/inspiration">Творческие Работы</Link>
          </ListItem>
          <ListItem>
            <Link to="/courses">Обучающие курсы</Link>
          </ListItem>
          <ListItem>
            <Link to="/community">Сообщества</Link>
          </ListItem>
        </List>
      </Section>
      <Section>
        <Title>Дополнительно</Title>
        <List>
          <ListItem>
            <Link to="/contact">Контактная Информация</Link>
          </ListItem>
          <ListItem>
            <Link to="/about">О Нас</Link>
          </ListItem>
        </List>
      </Section>
      <Copyright>© 2024 INKFLOW. Все права защищены.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
