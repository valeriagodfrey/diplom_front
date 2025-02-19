// src/components/PostModal.tsx
import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface PostModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (data: { title: string; tags: string[]; content: string }) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Передаем данные из формы плюс содержимое редактора
      onSubmit({ ...values, content });
      form.resetFields();
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Создать пост"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Создать"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Заголовок"
          rules={[{ required: true, message: "Введите заголовок" }]}
        >
          <Input placeholder="Заголовок поста" />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Теги"
          rules={[{ required: true, message: "Введите хотя бы один тег" }]}
        >
          <Select mode="tags" placeholder="Введите теги">
            {/* Пользователь может вводить свои значения */}
          </Select>
        </Form.Item>
        <Form.Item label="Контент">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostModal;
