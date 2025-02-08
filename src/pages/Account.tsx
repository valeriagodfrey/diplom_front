import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
// import { useRootStore } from "../stores/RootStore";
import { Button, Input } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

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
        <strong>{value}</strong>
      )}
    </Field>
  );
};

const Account = observer(() => {
  // const { authStore } = useRootStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [profileState, setProfileState] = useState({
    email: "info@gmail.com",
    userType: "Пользователь",
  });

  const [personalInfoState, setPersonalInfoState] = useState({
    firstName: "Иван",
    lastName: "Иванов",
    dob: "12-10-1990",
    phone: "+373 333 333 33",
  });

  const [addressState, setAddressState] = useState({
    country: "Молдова",
    city: "Тирасполь",
    postalCode: "3300",
  });

  const saveProfile = () => {
    // authStore.email = profileState.email;
    // authStore.userType = profileState.userType;
    setIsEditingProfile(false);
  };

  const savePersonalInfo = () => {
    setIsEditingPersonalInfo(false);
  };

  const saveAddress = () => {
    setIsEditingAddress(false);
  };

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
              onClick={saveProfile}
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
          <img src="https://via.placeholder.com/64" alt={""} />
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
              value={profileState.userType}
              isEditing={isEditingProfile}
              onChange={(value) =>
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
              onClick={savePersonalInfo}
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
              onClick={saveAddress}
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

export default Account;
