/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Tabs, Button, Modal, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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

/* Сетка с фиксированной шириной карточек и выравниванием по левому краю */
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

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  div {
    padding: 16px;
  }
`;

export const MyGallery = observer(() => {
  const { authStore } = useRootStore();
  const worksController = useWorksController();
  const [activeTab, setActiveTab] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (authStore.user) {
      worksController.fetchMyWorks(authStore.user.id);
    }
  }, [authStore.user, worksController]);

  const filteredWorks = worksController.works.filter((work) => {
    if (activeTab === "favorites") {
      return work.isFavorite;
    }
    return true;
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
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
        setIsModalVisible(false);
        form.resetFields();
        worksController.fetchMyWorks(authStore.user.id);
      }
    } catch (error) {
      console.error("Ошибка создания работы:", error);
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Header>Моя галерея</Header>
        <Button type="primary" onClick={showModal}>
          Добавить работу
        </Button>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginTop: 24 }}
        >
          <TabPane tab="Все работы" key="all">
            <WorksGrid>
              {filteredWorks.map((work: any) => (
                <WorkCard key={work.id}>
                  <img src={work.image} alt={work.title} />
                  <div>
                    <h3>{work.title}</h3>
                    <p>{work.author}</p>
                    <p>{work.category}</p>
                  </div>
                </WorkCard>
              ))}
            </WorksGrid>
          </TabPane>
          <TabPane tab="Сохраненные работы" key="favorites">
            <WorksGrid>
              {worksController.works
                .filter((work: any) => work.isFavorite)
                .map((work: any) => (
                  <WorkCard key={work.id}>
                    <img src={work.image} alt={work.title} />
                    <div>
                      <h3>{work.title}</h3>
                      <p>{work.author}</p>
                      <p>{work.category}</p>
                    </div>
                  </WorkCard>
                ))}
            </WorksGrid>
          </TabPane>
        </Tabs>
      </ContentWrapper>

      <Modal
        title="Добавить новую работу"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okText="Создать"
      >
        <Form form={form} layout="vertical">
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
    </PageWrapper>
  );
});
