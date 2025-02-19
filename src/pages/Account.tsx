// src/pages/Account.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/RootStore";
import { Button, Input } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import avatar from "../assets/avatar.jpg";

const ProfileWrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
`;

const SectionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & > span {
    font-size: 14px;
    color: #888;
  }

  & > strong {
    font-size: 16px;
    color: #333;
  }
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid #e8e8e8;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const EditableField = ({
  label,
  value,
  isEditing,
  onChange,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (newValue: string) => void;
}) => {
  return (
    <Field>
      <span>{label}</span>
      {isEditing ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <strong>{value && value.trim() !== "" ? value : "–"}</strong>
      )}
    </Field>
  );
};

export const Account = observer(() => {
  const { authStore, userStore } = useRootStore();

  // Локальное состояние для редактируемых данных профиля
  const [profileState, setProfileState] = useState({
    email: userStore.user?.email || "",
    userType: userStore.user?.role || "user",
  });

  const [personalInfoState, setPersonalInfoState] = useState({
    firstName: userStore.user?.firstName || "",
    lastName: userStore.user?.secondName || "",
    dob: userStore.user?.dob
      ? new Date(userStore.user.dob).toISOString().substring(0, 10)
      : "",
    phone: userStore.user?.phone || "",
  });

  const [addressState, setAddressState] = useState({
    country: userStore.user?.country || "",
    city: userStore.user?.city || "",
    postalCode: userStore.user?.postalCode || "",
  });

  useEffect(() => {
    if (authStore.user) {
      // Предполагаем, что authStore.user.id соответствует id в userStore
      userStore.fetchUser(authStore.user.id);
    }
  }, [authStore.user, userStore]);

  useEffect(() => {
    if (userStore.user) {
      setProfileState({
        email: userStore.user.email || "",
        userType: userStore.user.role || "user",
      });
      setPersonalInfoState({
        firstName: userStore.user.firstName || "",
        lastName: userStore.user.secondName || "",
        dob: userStore.user.dob
          ? new Date(userStore.user.dob).toISOString().substring(0, 10)
          : "",
        phone: userStore.user.phone || "",
      });
      setAddressState({
        country: userStore.user.country || "",
        city: userStore.user.city || "",
        postalCode: userStore.user.postalCode || "",
      });
    }
  }, [userStore.user]);

  const saveProfile = async () => {
    await userStore.updateUser({
      ...userStore.user,
      email: profileState.email,
      role: profileState.userType,
    });
  };

  const savePersonalInfo = async () => {
    const updateData = {
      firstName: personalInfoState.firstName,
      secondName: personalInfoState.lastName,
      dob: personalInfoState.dob,
      phone: personalInfoState.phone,
    };
    await userStore.updateUser(updateData);
  };

  const saveAddress = async () => {
    const updateData = {
      country: addressState.country,
      city: addressState.city,
      postalCode: addressState.postalCode,
    };
    await userStore.updateUser(updateData);
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <ProfileWrapper>
      {/* My Profile Section */}
      <Section>
        <SectionHeader>
          <span>Мой профиль</span>
          {isEditingProfile ? (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => {
                saveProfile();
                setIsEditingProfile(false);
              }}
            >
              Сохранить
            </Button>
          ) : (
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => setIsEditingProfile(true)}
            >
              Редактировать
            </Button>
          )}
        </SectionHeader>
        <Avatar>
          <img src={avatar} alt="avatar" />
          <div>
            <EditableField
              label="Email"
              value={profileState.email}
              isEditing={isEditingProfile}
              onChange={(value) =>
                setProfileState((prev) => ({ ...prev, email: value }))
              }
            />
            <EditableField
              label="Тип пользователя"
              value={
                profileState.userType === "mentor"
                  ? "Ментор"
                  : profileState.userType === "user"
                  ? "Пользователь"
                  : "–"
              }
              isEditing={isEditingProfile}
              onChange={(value: "user" | "mentor") =>
                setProfileState((prev) => ({ ...prev, userType: value }))
              }
            />
          </div>
        </Avatar>
      </Section>

      {/* Personal Information Section */}
      <Section>
        <SectionHeader>
          <span>Персональная информация</span>
          {isEditingPersonalInfo ? (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => {
                savePersonalInfo();
                setIsEditingPersonalInfo(false);
              }}
            >
              Сохранить
            </Button>
          ) : (
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => setIsEditingPersonalInfo(true)}
            >
              Редактировать
            </Button>
          )}
        </SectionHeader>
        <SectionContent>
          <EditableField
            label="Имя"
            value={personalInfoState.firstName}
            isEditing={isEditingPersonalInfo}
            onChange={(value) =>
              setPersonalInfoState((prev) => ({ ...prev, firstName: value }))
            }
          />
          <EditableField
            label="Фамилия"
            value={personalInfoState.lastName}
            isEditing={isEditingPersonalInfo}
            onChange={(value) =>
              setPersonalInfoState((prev) => ({ ...prev, lastName: value }))
            }
          />
          <EditableField
            label="Дата рождения"
            value={personalInfoState.dob}
            isEditing={isEditingPersonalInfo}
            onChange={(value) =>
              setPersonalInfoState((prev) => ({ ...prev, dob: value }))
            }
          />
          <EditableField
            label="Номер телефона"
            value={personalInfoState.phone}
            isEditing={isEditingPersonalInfo}
            onChange={(value) =>
              setPersonalInfoState((prev) => ({ ...prev, phone: value }))
            }
          />
        </SectionContent>
      </Section>

      {/* Address Section */}
      <Section>
        <SectionHeader>
          <span>Адрес</span>
          {isEditingAddress ? (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => {
                saveAddress();
                setIsEditingAddress(false);
              }}
            >
              Сохранить
            </Button>
          ) : (
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => setIsEditingAddress(true)}
            >
              Редактировать
            </Button>
          )}
        </SectionHeader>
        <SectionContent>
          <EditableField
            label="Страна"
            value={addressState.country}
            isEditing={isEditingAddress}
            onChange={(value) =>
              setAddressState((prev) => ({ ...prev, country: value }))
            }
          />
          <EditableField
            label="Город"
            value={addressState.city}
            isEditing={isEditingAddress}
            onChange={(value) =>
              setAddressState((prev) => ({ ...prev, city: value }))
            }
          />
          <EditableField
            label="Почтовый индекс"
            value={addressState.postalCode}
            isEditing={isEditingAddress}
            onChange={(value) =>
              setAddressState((prev) => ({ ...prev, postalCode: value }))
            }
          />
        </SectionContent>
      </Section>
    </ProfileWrapper>
  );
});
