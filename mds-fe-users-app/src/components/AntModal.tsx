import { Button, Modal, type ModalProps, Row, Space } from "antd";
import { type PropsWithChildren, useEffect, useState } from "react";
import { infrastructure } from "@/infrastructure";
import { type IModalEventPayload } from "@/types";

function AntModal<T = any>({
  modalProps,
  modalName: eventName,
  initialOpen = false,
  Component,
}: {
  modalProps?: Omit<ModalProps, "open" | "onOk" | "footer">;
  modalName: string;
  initialOpen: boolean;
  Component: (params: {
    data: T;
    closeModal: () => void;
    modalName: string;
  }) => React.ReactNode;
}) {
  const { modalClient } = infrastructure;
  const [modal, setModal] = useState<{ open: boolean; data: any }>({
    open: initialOpen,
    data: null,
  });

  useEffect(() => {
    const unsubscribe = modalClient.subscribe(
      eventName,
      ({ open, data }: IModalEventPayload) => {
        setModal((prev) => {
          return {
            ...prev,
            open,
            data: open === false ? null : data,
          };
        });
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  function handleCancel() {
    modalClient.closeModal({ modalName: eventName });
  }
  return (
    <Modal
      open={modal.open}
      footer={null}
      onCancel={handleCancel}
      {...modalProps}
    >
      <Component
        data={modal.data}
        closeModal={handleCancel}
        modalName={eventName}
      />
    </Modal>
  );
}

const RemoveConfirmationCommands = ({
  children,
  onRemove,
  onClose,
  isLoading = false,
}: PropsWithChildren<{
  onRemove: () => void;
  onClose: () => void;
  isLoading?: boolean;
}>) => {
  return (
    <>
      <div>{children}</div>
      <Row justify="end">
        <Space>
          <Button
            type="primary"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => onRemove()}
            loading={isLoading}
          >
            Remove
          </Button>
        </Space>
      </Row>
    </>
  );
};

AntModal.RemoveConfirmationCommands = RemoveConfirmationCommands;

export { AntModal };
