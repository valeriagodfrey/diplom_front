/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

interface CreateCourseModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background: rgb(248, 248, 250);
    padding: 24px;
  }
`;

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [lessonContent, setLessonContent] = useState("");

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, introLessonContent: lessonContent });
      form.resetFields();
      setLessonContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledModal
      visible={visible}
      title="Создать курс"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Создать"
      cancelText="Отмена"
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Название курса"
          rules={[{ required: true, message: "Введите название курса" }]}
        >
          <Input placeholder="Название курса" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание курса"
          rules={[{ required: true, message: "Введите описание курса" }]}
        >
          <Input.TextArea rows={3} placeholder="Описание курса" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Ссылка на изображение"
          rules={[{ required: true, message: "Введите URL изображения" }]}
        >
          <Input placeholder="URL изображения" />
        </Form.Item>
        <Form.Item
          name="introLessonTitle"
          label="Название вводного урока"
          rules={[
            { required: true, message: "Введите название вводного урока" },
          ]}
        >
          <Input placeholder="Название вводного урока" />
        </Form.Item>
        <Form.Item label="Контент вводного урока">
          <ReactQuill
            theme="snow"
            value={lessonContent}
            onChange={setLessonContent}
          />
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default CreateCourseModal;
