/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/auth/AuthModal.tsx
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores/RootStore";

const { Option } = Select;

// Типизация формы
interface FormValues {
  email: string;
  password: string;
  nickName?: string;
  firstName?: string;
  secondName?: string;
  role?: "user" | "mentor";
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 16px;
  position: relative;

  .ant-form-item-label {
    padding: 4px 0; /* Устанавливаем отступ у лейбла */
  }

  .ant-form-item-explain {
    position: absolute;
    left: 0;
    font-size: 12px;
    color: red;
  }
`;
const StyledButton = styled(Button)`
  background-color: rgb(33, 70, 116) !important;
`;
const AuthModal: React.FC = observer(() => {
  const { authStore } = useRootStore();
  const [form] = Form.useForm<FormValues>(); // Создаем объект формы

  useEffect(() => {
    authStore.checkAuth(); // Проверяем токен при загрузке
  }, [authStore]);

  const handleSubmit = async (values: FormValues) => {
    const { email, password, role } = values;

    if (authStore.isRegister) {
      // Регистрация
      await authStore.registration(
        email,
        password,
        values.firstName || "",
        values.secondName || "",
        values.nickName || "",
        role || "user"
      );
    } else {
      // Вход
      await authStore.login(email, password);
    }

    if (!authStore.error) {
      authStore.setModalVisible(false); // Закрываем модальное окно при успешной операции
    }
  };

  const switchForm = () => {
    form.resetFields();
    if (authStore.isRegister) {
      authStore.switchToLogin();
    } else authStore.switchToRegister();
  };

  return (
    <Modal
      title={authStore.isRegister ? "Регистрация" : "Вход"}
      visible={authStore.modalVisible}
      onCancel={() => authStore.setModalVisible(false)}
      width={420}
      footer={null}
      style={{
        top: authStore.isRegister ? "20%" : "30%",
      }}
    >
      <ModalContent>
        <Form<FormValues>
          layout="vertical"
          form={form} // Привязываем объект формы
          onFinish={handleSubmit}
          initialValues={{
            role: "user",
          }}
          validateTrigger="onSubmit" // Валидация только при сабмите
        >
          {authStore.isRegister && (
            <>
              <StyledFormItem
                label="Логин"
                name="nickName"
                rules={[
                  { required: true, message: "Пожалуйста, введите логин" },
                  { min: 3, message: "Логин должен быть не менее 3 символов" },
                ]}
              >
                <Input />
              </StyledFormItem>
              <StyledFormItem
                label="Имя"
                name="firstName"
                rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
              >
                <Input />
              </StyledFormItem>
              <StyledFormItem
                label="Фамилия"
                name="secondName"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите фамилию",
                  },
                ]}
              >
                <Input />
              </StyledFormItem>
            </>
          )}
          <StyledFormItem
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите email",
                type: "email",
              },
            ]}
          >
            <Input />
          </StyledFormItem>
          <StyledFormItem
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: "Пожалуйста, введите пароль" },
              { min: 6, message: "Пароль должен быть не менее 6 символов" },
            ]}
          >
            <Input.Password />
          </StyledFormItem>
          {authStore.isRegister && (
            <StyledFormItem
              label="Тип пользователя"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите тип пользователя",
                },
              ]}
            >
              <Select>
                <Option value="user">Пользователь</Option>
                <Option value="mentor">Ментор</Option>
              </Select>
            </StyledFormItem>
          )}
          <div style={{ paddingTop: "8px", gap: "5px", display: "flex" }}>
            <StyledButton
              type="primary"
              htmlType="submit"
              loading={authStore.isLoading}
            >
              {authStore.isRegister ? "Регистрация" : "Вход"}
            </StyledButton>
            <Button
              type="link"
              onClick={switchForm}
              style={{ color: "rgb(33, 70, 116)" }}
            >
              {authStore.isRegister
                ? "Уже есть аккаунт? Вход"
                : "Нет аккаунта? Регистрация"}
            </Button>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  );
});

export default AuthModal;
