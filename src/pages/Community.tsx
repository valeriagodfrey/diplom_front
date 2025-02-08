/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Tabs, Button, Modal, Form, Input, Select, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/RootStore";

const { TabPane } = Tabs;

const PageWrapper = styled.div`
  padding: 24px;
  background: rgb(226, 241, 255);
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(186, 217, 252);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 1.8em;
  font-weight: 500;
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
  grid-template-columns: repeat(auto-fill, 280px);
  gap: 16px;
  justify-content: start;
  margin-top: 24px;
`;

const Section = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
`;

const CommunityCard = styled.div`
  width: 280px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  div.card-content {
    padding: 16px;
  }

  div.actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    padding: 8px 16px;
    border-top: 1px solid #e8e8e8;
  }
`;

export const Community = observer(() => {
  const { authStore, communityStore, postStore } = useRootStore();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [postForm] = Form.useForm();
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);

  const categories = ["Все", "Art", "Design", "Photography"];

  // Загружаем сообщества
  useEffect(() => {
    communityStore.fetchCommunities();
  }, [communityStore]);

  // Фильтрация по выбранной категории
  const filteredCommunities =
    selectedCategory === "Все"
      ? communityStore.communities
      : communityStore.communities.filter(
          (comm: any) =>
            comm.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Для вкладки "Мои сообщества"
  const myCommunities =
    authStore.user &&
    communityStore.communities.filter(
      (comm: any) => comm.userId === authStore.user.id
    );

  // Обработчики создания сообщества
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateCommunity = async () => {
    try {
      const values = await createForm.validateFields();
      if (!authStore.user?.id) throw new Error("Пользователь не авторизован");
      const payload = { ...values, userId: authStore.user.id };
      await communityStore.createCommunity(payload);
      setIsCreateModalVisible(false);
      createForm.resetFields();
      communityStore.fetchCommunities();
    } catch (error) {
      console.error("Ошибка создания сообщества:", error);
    }
  };

  // Обработчики редактирования сообщества (только для "Моих сообществ")
  const openEditModal = (community: any) => {
    setSelectedCommunity(community);
    editForm.setFieldsValue({
      name: community.name,
      category: community.category,
      description: community.description,
    });
    setIsEditModalVisible(true);
  };

  const handleEditCommunity = async () => {
    try {
      const values = await editForm.validateFields();
      await communityStore.updateCommunity(selectedCommunity.id, values);
      setIsEditModalVisible(false);
      setSelectedCommunity(null);
      communityStore.fetchCommunities();
    } catch (error) {
      console.error("Ошибка обновления сообщества:", error);
    }
  };

  const handleDeleteCommunity = async (id: number) => {
    try {
      await communityStore.deleteCommunity(id);
      communityStore.fetchCommunities();
    } catch (error) {
      console.error("Ошибка удаления сообщества:", error);
    }
  };

  // Детали сообщества: открытие модального окна для просмотра сообщества и его постов
  const openDetailModal = (community: any) => {
    setSelectedCommunity(community);
    postStore.fetchPosts(community.id);
    setIsDetailModalVisible(true);
  };

  // Создание поста внутри сообщества
  const handleCreatePost = async () => {
    try {
      const values = await postForm.validateFields();
      if (selectedCommunity) {
        await postStore.createPost(selectedCommunity.id, {
          content: values.content,
          userId: authStore.user.id,
        });
        postForm.resetFields();
        postStore.fetchPosts(selectedCommunity.id);
      }
    } catch (error) {
      console.error("Ошибка создания поста:", error);
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Header>Сообщества</Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Categories>
            {categories.map((cat) => (
              <Category
                key={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Category>
            ))}
          </Categories>
          <Button type="primary" onClick={showCreateModal}>
            Создать сообщество
          </Button>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginTop: 24 }}
        >
          <TabPane tab="Все сообщества" key="all">
            <GridContainer>
              {filteredCommunities.map((community: any) => (
                <CommunityCard key={community.id}>
                  <div className="card-content">
                    <h3>{community.name}</h3>
                    <p>{community.category}</p>
                    <p>{community.description || "–"}</p>
                  </div>
                  <div className="actions">
                    <Button
                      type="default"
                      onClick={() => openDetailModal(community)}
                    >
                      Подробнее
                    </Button>
                  </div>
                </CommunityCard>
              ))}
            </GridContainer>
          </TabPane>
          <TabPane tab="Мои сообщества" key="my">
            <GridContainer>
              {authStore.user &&
                myCommunities.map((community: any) => (
                  <CommunityCard key={community.id}>
                    <div className="card-content">
                      <h3>{community.name}</h3>
                      <p>{community.category}</p>
                      <p>{community.description || "–"}</p>
                    </div>
                    <Section className="actions">
                      <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(community)}
                      >
                        Редактировать
                      </Button>
                      <Popconfirm
                        title="Вы уверены, что хотите удалить сообщество?"
                        onConfirm={() => handleDeleteCommunity(community.id)}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <Button type="default" icon={<DeleteOutlined />}>
                          Удалить
                        </Button>
                      </Popconfirm>
                    </Section>
                  </CommunityCard>
                ))}
            </GridContainer>
          </TabPane>
        </Tabs>
      </ContentWrapper>

      {/* Модальное окно создания сообщества */}
      <Modal
        title="Создать сообщество"
        visible={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          createForm.resetFields();
        }}
        onOk={handleCreateCommunity}
        okText="Создать"
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: "Введите название сообщества" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            rules={[{ required: true, message: "Выберите категорию" }]}
          >
            <Select placeholder="Выберите категорию">
              <Select.Option value="art">Art</Select.Option>
              <Select.Option value="design">Design</Select.Option>
              <Select.Option value="photography">Photography</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно редактирования сообщества */}
      <Modal
        title="Редактировать сообщество"
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
          setSelectedCommunity(null);
        }}
        onOk={handleEditCommunity}
        okText="Сохранить"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: "Введите название сообщества" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            rules={[{ required: true, message: "Выберите категорию" }]}
          >
            <Select placeholder="Выберите категорию">
              <Select.Option value="art">Art</Select.Option>
              <Select.Option value="design">Design</Select.Option>
              <Select.Option value="photography">Photography</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно деталей сообщества (с постами) */}
      <Modal
        title={selectedCommunity ? selectedCommunity.name : "Детали сообщества"}
        visible={isDetailModalVisible}
        onCancel={() => {
          setIsDetailModalVisible(false);
          setSelectedCommunity(null);
        }}
        footer={null}
      >
        {selectedCommunity && (
          <div>
            <p>{selectedCommunity.description || "Нет описания"}</p>
            <h3>Посты</h3>
            {postStore.isLoading ? (
              <p>Загрузка постов...</p>
            ) : (
              postStore.posts.map((post: any) => (
                <div
                  key={post.id}
                  style={{
                    borderBottom: "1px solid #e8e8e8",
                    padding: "8px 0",
                  }}
                >
                  <p>{post.content}</p>
                  <Popconfirm
                    title="Удалить пост?"
                    onConfirm={() =>
                      postStore.deletePost(selectedCommunity.id, post.id)
                    }
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button type="link" danger>
                      Удалить
                    </Button>
                  </Popconfirm>
                </div>
              ))
            )}
            <Form
              layout="inline"
              onFinish={handleCreatePost}
              style={{ marginTop: 16 }}
            >
              <Form.Item
                name="content"
                rules={[{ required: true, message: "Введите текст поста" }]}
              >
                <Input placeholder="Новый пост" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Добавить пост
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </PageWrapper>
  );
});
