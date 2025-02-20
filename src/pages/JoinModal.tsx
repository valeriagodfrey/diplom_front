import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

interface JoinModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  course: {
    title: string;
    description: string;
    duration: string;
    sessions: string;
  };
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    padding: 24px;
  }
  .ant-modal-header {
    border-bottom: none;
    background: transparent;
    text-align: center;
  }
  .ant-modal-title {
    font-size: 26px;
    font-weight: bold;
    color: #1a1a2e;
  }
  .ant-modal-body {
    font-size: 16px;
    color: #333;
    text-align: center;
  }
  .ant-modal-footer {
    border-top: none;
    display: flex;
    justify-content: center;
    gap: 16px;
  }
`;

const InfoRow = styled.div`
  margin: 12px 0;
  font-weight: 500;
  span {
    font-weight: normal;
    margin-left: 8px;
  }
`;

const JoinModal: React.FC<JoinModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  course,
}) => {
  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      onOk={onSubmit}
      okText="Присоединиться"
      cancelText="Отмена"
      centered
    >
      <div>
        <p style={{ fontSize: "1.2em", marginBottom: "16px" }}>
          Вы собираетесь присоединиться к курсу:
        </p>
        <h2 style={{ marginBottom: "16px", color: "#1a1a2e" }}>
          {course.title}
        </h2>
        <p style={{ marginBottom: "24px" }}>{course.description}</p>
        <InfoRow>
          <strong>Длительность:</strong>
          <span>{course.duration}</span>
        </InfoRow>
        <InfoRow>
          <strong>Занятий:</strong>
          <span>{course.sessions}</span>
        </InfoRow>
        <InfoRow>
          <strong>Автор курса:</strong>
          <span>Валерия Оборочану</span>
        </InfoRow>
      </div>
    </StyledModal>
  );
};

export default JoinModal;
