// src/components/CustomHeader.tsx
import React from "react";
import { Layout, Menu, Dropdown, Button, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useRootStore } from "../../stores/RootStore";
import AuthModal from "../../components/auth/AuthModal";
import { observer } from "mobx-react-lite";

const { Header } = Layout;

const CustomHeader: React.FC = observer(() => {
  const { authStore } = useRootStore();
  const location = useLocation();

  // Определяем activeKey на основе текущего пути
  let activeKey: string = "";
  if (location.pathname === "/" || location.pathname === "/home") {
    activeKey = "/";
  } else if (location.pathname.startsWith("/inspiration")) {
    activeKey = "/inspiration";
  } else if (location.pathname.startsWith("/courses")) {
    activeKey = "/courses";
  } else if (location.pathname.startsWith("/community")) {
    activeKey = "/community";
  }

  const profileMenu = (
    <Menu>
      <Menu.Item key="account">
        <Link to="/account">Мой аккаунт</Link>
      </Menu.Item>
      <Menu.Item key="gallery">
        <Link to="/my-gallery">Моя галерея</Link>
      </Menu.Item>
      <Menu.Item key="community">
        <Link to="/my-communities">Чаты</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => authStore.logout()}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <Link to="/" style={{ height: "40px" }}>
        <Logo src={logo} alt="InkFlow" />
      </Link>
      <MenuContainer>
        <Menu mode="horizontal" selectedKeys={[activeKey]}>
          <Menu.Item key="/">
            <Link to="/">Главная</Link>
          </Menu.Item>
          <Menu.Item key="/inspiration">
            <Link to="/inspiration">Вдохновение</Link>
          </Menu.Item>
          <Menu.Item key="/courses">
            <Link to="/courses">Обучение</Link>
          </Menu.Item>
          <Menu.Item key="/community">
            <Link to="/community">Сообщества</Link>
          </Menu.Item>
        </Menu>
      </MenuContainer>
      <ProfileContainer>
        {authStore.isAuthenticated ? (
          <Dropdown overlay={profileMenu} trigger={["click"]}>
            <AvatarWrapper>
              <Avatar icon={<UserOutlined />} />
              <UserName>
                {authStore.user && authStore.user.email
                  ? authStore.user.email
                  : "Профиль"}
              </UserName>
              <DownOutlined />
            </AvatarWrapper>
          </Dropdown>
        ) : (
          <AuthButtons>
            <Button
              type="primary"
              onClick={() => authStore.setLoginModalVisible(true)}
            >
              Войти
            </Button>
            <Button onClick={() => authStore.setRegisterModalVisible(true)}>
              Зарегистрироваться
            </Button>
            {authStore.modalVisible && <AuthModal />}
          </AuthButtons>
        )}
      </ProfileContainer>
    </StyledHeader>
  );
});

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 16px;
  }
`;

const Logo = styled.img`
  height: 40px;
`;

const MenuContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.span`
  margin-left: 8px;
  margin-right: 8px;
`;

export default CustomHeader;
