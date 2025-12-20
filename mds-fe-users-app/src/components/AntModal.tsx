import { Button, Modal, type ModalProps, Row, Space } from "antd";
import { type PropsWithChildren, useEffect, useState } from "react";
import { infrastructure } from "@/infrastructure";
import { type IModalEventPayload } from "@/types";

/**
 * Generic modal component that integrates with the modal client observer pattern.
 * Automatically subscribes to modal events and manages open/close state.
 * Supports custom content through a render prop pattern.
 *
 * @template T - Type of data passed to the modal component
 * @param {Object} props - Component props
 * @param {string} props.modalName - Unique name identifier for the modal (used for event subscription)
 * @param {boolean} props.initialOpen - Initial open state of the modal
 * @param {Omit<ModalProps, "open" | "onOk" | "footer">} [props.modalProps] - Additional Ant Design Modal props
 * @param {Function} props.Component - Render function that receives modal data and callbacks
 * @param {T} props.Component.params.data - Data passed to the modal
 * @param {Function} props.Component.params.closeModal - Function to close the modal
 * @param {string} props.Component.params.modalName - Name of the modal
 * @returns {JSX.Element} Modal component
 *
 * @example
 * <AntModal<IUser>
 *   modalName="removeUser"
 *   initialOpen={false}
 *   modalProps={{ title: "Remove User" }}
 *   Component={({ data, closeModal }) => (
 *     <div>
 *       <p>Remove {data.firstName}?</p>
 *       <button onClick={closeModal}>Cancel</button>
 *     </div>
 *   )}
 * />
 */
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
  }, [eventName, modalClient]);

  /**
   * Handles modal close action.
   * Dispatches close event through modal client.
   *
   * @private
   */
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

/**
 * Pre-built confirmation commands component for remove/delete actions.
 * Provides a consistent UI with Close and Remove buttons.
 * Can be used as a child of AntModal for confirmation dialogs.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display above the action buttons
 * @param {Function} props.onRemove - Callback function called when Remove button is clicked
 * @param {Function} props.onClose - Callback function called when Close button is clicked
 * @param {boolean} [props.isLoading] - Whether the remove action is in progress (shows loading state)
 * @returns {JSX.Element} Confirmation commands component
 *
 * @example
 * <AntModal.RemoveConfirmationCommands
 *   onRemove={() => handleDelete()}
 *   onClose={() => closeModal()}
 *   isLoading={isDeleting}
 * >
 *   <h1>Remove User</h1>
 *   <p>Are you sure you want to remove this user?</p>
 * </AntModal.RemoveConfirmationCommands>
 */
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
