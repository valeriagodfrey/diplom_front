/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Flex,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/RootStore";
import PostModal from "./PostModal";
import capitalize from "capitalize";
import { toast } from "react-toastify";

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

const ModalContent = styled.div`
  display: flex;
  gap: 24px;
`;

const PostsColumn = styled.div`
  flex: 2;
  max-height: 70vh;
  overflow-y: auto;
`;

const InfoColumn = styled.div`
  flex: 1;
  background: #f7f9fc;
  padding: 16px;
  border-radius: 8px;
`;

const Tag = styled.span`
  display: inline-block;
  background: #e0e0e0;
  color: #555;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 0.9em;
`;

const PostCard = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Community = observer(() => {
  const { authStore, userStore, communityStore, postStore } = useRootStore();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [localIsMember, setLocalIsMember] = useState(false);

  useEffect(() => {
    if (selectedCommunity && userStore.user) {
      setLocalIsMember(
        userStore.user.joinedCommunities?.includes(selectedCommunity.id)
      );
    }
  }, [selectedCommunity, userStore.user]);

  useEffect(() => {
    if (authStore.user) {
      userStore.fetchUser(authStore.user.id);
    }
  }, [authStore.user, userStore]);

  const categories = ["Все", "Art", "Design", "Photography"];

  useEffect(() => {
    communityStore.fetchCommunities();
  }, [communityStore]);

  const filteredCommunities =
    selectedCategory === "Все"
      ? communityStore.communities
      : communityStore.communities.filter(
          (comm: any) =>
            comm.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const myCommunities =
    authStore.user &&
    communityStore.communities.filter(
      (comm: any) => comm.userId === authStore.user.id
    );

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateCommunity = async () => {
    try {
      const values = await createForm.validateFields();
      if (!authStore.user?.id) toast.error("Пользователь не авторизован");
      const payload = { ...values, userId: authStore.user.id };
      await communityStore.createCommunity(payload);
      setIsCreateModalVisible(false);
      createForm.resetFields();
      communityStore.fetchCommunities();
    } catch (error) {
      console.error("Ошибка создания сообщества:", error);
    }
  };

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

  const openDetailModal = (community: any) => {
    setSelectedCommunity(community);
    postStore.fetchPosts(community.id);
    setIsDetailModalVisible(true);
  };

  const refreshSelectedCommunity = async () => {
    try {
      const updatedCommunity = await communityStore.fetchCommunityById(
        selectedCommunity.id
      );
      setSelectedCommunity(updatedCommunity);
    } catch (error) {
      console.error("Ошибка обновления данных сообщества:", error);
    }
  };

  const handleJoinCommunity = async () => {
    try {
      await communityStore.joinCommunity(
        selectedCommunity.id,
        authStore.user.id
      );
      await refreshSelectedCommunity();
      await userStore.fetchUser(authStore.user.id);
    } catch (error) {
      toast.error("Ошибка вступления в сообщество: необходима авторизация");
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      await communityStore.leaveCommunity(
        selectedCommunity.id,
        authStore.user.id
      );
      await refreshSelectedCommunity();
      await userStore.fetchUser(authStore.user.id);
    } catch (error) {
      console.error("Ошибка выхода из сообщества:", error);
    }
  };

  const openPostModal = () => {
    setIsPostModalVisible(true);
  };

  const handlePostSubmit = async (data: {
    title: string;
    tags: string[];
    content: string;
  }) => {
    try {
      await postStore.createPost(selectedCommunity.id, {
        ...data,
        userId: authStore.user.id,
      });
      setIsPostModalVisible(false);
      postStore.fetchPosts(selectedCommunity.id);
    } catch (error) {
      console.error("Ошибка создания поста:", error);
    }
  };
  const handleDeletePost = async (postId: number) => {
    try {
      await postStore.deletePost(selectedCommunity.id, postId);
      postStore.fetchPosts(selectedCommunity.id);
    } catch (error) {
      console.error("Ошибка удаления поста:", error);
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
                    <p>{capitalize(community.category)}</p>
                    <Description>{community.description || "–"}</Description>
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
                      <p>{String(community.category)}</p>
                      <Description>{community.description || "–"}</Description>
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

      {/* Модальное окно с подробной информацией о сообществе */}
      <Modal
        visible={isDetailModalVisible}
        onCancel={() => {
          setIsDetailModalVisible(false);
          setSelectedCommunity(null);
        }}
        footer={null}
        width="80%"
        bodyStyle={{ padding: "24px" }}
      >
        {localIsMember && (
          <Button
            type="primary"
            onClick={openPostModal}
            style={{ marginTop: 16 }}
          >
            Добавить пост
          </Button>
        )}
        {selectedCommunity && (
          <ModalContent>
            <PostsColumn>
              <h3>Посты</h3>
              {postStore.isLoading ? (
                <p>Загрузка постов...</p>
              ) : (
                postStore.posts.map((post: any) => (
                  <PostCard key={post.id}>
                    <h4>{post.title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    <div>
                      {post.tags?.map((tag: string) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    {/* Если пост принадлежит текущему пользователю, показываем кнопку удаления */}
                    <Flex style={{ width: "100%" }} justify="flex-end">
                      {authStore.user && authStore.user.id === post.userId && (
                        <Popconfirm
                          title="Вы уверены, что хотите удалить этот пост?"
                          onConfirm={() => handleDeletePost(post.id)}
                          okText="Да"
                          cancelText="Нет"
                        >
                          <Button type="default" danger size="small">
                            Удалить
                          </Button>
                        </Popconfirm>
                      )}
                    </Flex>
                  </PostCard>
                ))
              )}
            </PostsColumn>

            <InfoColumn>
              <h2>{selectedCommunity.name}</h2>
              <p>{selectedCommunity.description || "Нет описания"}</p>
              <p>
                <strong>Участников:</strong>{" "}
                {selectedCommunity.membersCount || 0}
              </p>
              <div>
                {selectedCommunity.keywords &&
                  selectedCommunity.keywords.map((tag: string) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
              </div>
              <div style={{ marginTop: 16 }}>
                {localIsMember ? (
                  <Button type="default" danger onClick={handleLeaveCommunity}>
                    Покинуть сообщество
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleJoinCommunity}>
                    Вступить в сообщество
                  </Button>
                )}
              </div>
            </InfoColumn>
          </ModalContent>
        )}
      </Modal>
      {/* Модальное окно для создания поста */}
      <PostModal
        visible={isPostModalVisible}
        onCancel={() => setIsPostModalVisible(false)}
        onSubmit={handlePostSubmit}
      />
    </PageWrapper>
  );
});
