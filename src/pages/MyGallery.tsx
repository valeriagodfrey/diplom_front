/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Popconfirm,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import useWorksController from "../controllers/WorksController";
import { useRootStore } from "../stores/RootStore";

const { TabPane } = Tabs;

const PageWrapper = styled.div`
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1f1f1f;
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  gap: 16px;
  justify-content: start;
  margin-top: 24px;
`;

const WorkCard = styled.div`
  width: 280px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  div.card-content {
    padding: 16px;
  }

  div.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    border-top: 1px solid #e8e8e8;
  }
`;

export const MyGallery = observer(() => {
  const { authStore, userStore } = useRootStore();
  const worksController = useWorksController();
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [selectedWork, setSelectedWork] = useState<any>(null);
  useEffect(() => {
    if (authStore.user) {
      userStore.fetchUser(authStore.user.id);
    }
  }, [authStore.user, userStore]);
  useEffect(() => {
    if (authStore.user) {
      worksController.fetchMyWorks(authStore.user.id);
      worksController.fetchWorks();
    }
  }, [authStore.user, worksController]);

  // Создание работы
  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      const file =
        values.image && values.image[0] && values.image[0].originFileObj;
      if (!file) {
        throw new Error("Выберите файл изображения");
      }
      if (authStore.user?.id) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("author", values.author);
        formData.append("image", file);
        formData.append("userId", authStore.user.id);
        await worksController.createWork(formData);
        setIsCreateModalVisible(false);
        createForm.resetFields();
        worksController.fetchMyWorks(authStore.user.id);
      }
    } catch (error) {
      console.error("Ошибка создания работы:", error);
    }
  };

  // Открытие модального окна редактирования
  const openEditModal = (work: any) => {
    setSelectedWork(work);
    editForm.setFieldsValue({
      title: work.title,
      category: work.category,
      author: work.author,
    });
    setIsEditModalVisible(true);
  };

  // Редактирование работы
  const handleEdit = async () => {
    try {
      const values = await editForm.validateFields();
      await worksController.updateWork(selectedWork.id, values);
      setIsEditModalVisible(false);
      setSelectedWork(null);
      worksController.fetchMyWorks(authStore.user.id);
    } catch (error) {
      console.error("Ошибка обновления работы:", error);
    }
  };

  // Удаление работы
  const handleDelete = async (id: number) => {
    try {
      await worksController.remove(id);
      worksController.fetchMyWorks(authStore.user.id);
    } catch (error) {
      console.error("Ошибка удаления работы:", error);
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Header>Моя галерея</Header>
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Добавить работу
        </Button>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginTop: 24 }}
        >
          <TabPane tab="Все работы" key="all">
            <WorksGrid>
              {worksController.myWorks.map((work: any) => (
                <WorkCard key={work.id}>
                  <img src={work.image} alt={work.title} />
                  <div className="card-content">
                    <h3>{work.title}</h3>
                    <p>{work.author}</p>
                    <p>{work.category}</p>
                  </div>
                  <div className="actions">
                    <Button
                      type="default"
                      icon={<EditOutlined />}
                      onClick={() => openEditModal(work)}
                    />
                    <Popconfirm
                      title="Вы уверены, что хотите удалить эту работу?"
                      onConfirm={() => handleDelete(work.id)}
                      okText="Да"
                      cancelText="Нет"
                    >
                      <Button type="default" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </div>
                </WorkCard>
              ))}
            </WorksGrid>
          </TabPane>
          <TabPane tab="Сохраненные работы" key="favorites">
            <WorksGrid>
              {worksController.works
                .filter((work: any) =>
                  userStore.user.favoriteWorks.find((id) => id === work.id)
                )
                .map((work: any) => (
                  <WorkCard key={work.id}>
                    <img src={work.image} alt={work.title} />
                    <div className="card-content">
                      <h3>{work.title}</h3>
                      <p>{work.author}</p>
                      <p>{work.category}</p>
                    </div>
                    <div className="actions">
                      <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(work)}
                      />
                      <Popconfirm
                        title="Вы уверены, что хотите удалить эту работу?"
                        onConfirm={() => handleDelete(work.id)}
                        okText="Да"
                        cancelText="Нет"
                      >
                        <Button type="default" icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </div>
                  </WorkCard>
                ))}
            </WorksGrid>
          </TabPane>
        </Tabs>
      </ContentWrapper>

      {/* Модальное окно создания работы */}
      <Modal
        title="Добавить новую работу"
        visible={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          createForm.resetFields();
        }}
        onOk={handleCreate}
        okText="Создать"
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="title"
            label="Название работы"
            rules={[{ required: true, message: "Введите название работы" }]}
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
          <Form.Item
            name="author"
            label="Автор"
            rules={[{ required: true, message: "Введите имя автора" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Изображение"
            rules={[{ required: true, message: "Загрузите изображение" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Выбрать файл</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Модальное окно редактирования работы */}
      <Modal
        title="Редактировать работу"
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
          setSelectedWork(null);
        }}
        onOk={handleEdit}
        okText="Сохранить"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="title"
            label="Название работы"
            rules={[{ required: true, message: "Введите название работы" }]}
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
          <Form.Item
            name="author"
            label="Автор"
            rules={[{ required: true, message: "Введите имя автора" }]}
          >
            <Input />
          </Form.Item>
          {/* При необходимости можно добавить редактирование изображения */}
        </Form>
      </Modal>
    </PageWrapper>
  );
});
