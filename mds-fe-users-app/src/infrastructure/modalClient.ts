import { observer } from "@/libs";
import { OBSERVER_SCOPES, type IModalEventPayload } from "@/types";

/**
 * Creates a modal client instance that manages modal state through observer pattern.
 * Provides methods to open, close, and subscribe to modal events.
 *
 * @returns {Object} Modal client with subscribe, openModal, and closeModal methods
 * @returns {Function} subscribe - Subscribe to modal events
 * @returns {Function} openModal - Open a modal with data
 * @returns {Function} closeModal - Close a modal
 *
 * @example
 * const modalClient = createModalClient();
 * modalClient.openModal({ modalName: 'removeUser', data: user });
 * modalClient.subscribe('removeUser', ({ open, data }) => {
 *   console.log('Modal state:', open, data);
 * });
 */
const createModalClient = () => {
  /**
   * Dispatches a modal event through the observer system.
   *
   * @private
   * @param {Object} params - Event parameters
   * @param {string} params.eventName - Name of the modal event
   * @param {IModalEventPayload} params.payload - Modal payload with open state and data
   */
  function dispatchModalEvent({
    eventName,
    payload,
  }: {
    eventName: string;
    payload: IModalEventPayload;
  }) {
    observer.dispatch({
      scope: OBSERVER_SCOPES.MODAL,
      eventName,
      payload,
    });
  }

  return {
    /**
     * Subscribes to modal events for a specific modal name.
     * Returns an unsubscribe function to remove the subscription.
     *
     * @param {string} eventName - Name of the modal to subscribe to
     * @param {Function} callback - Callback function called when modal state changes
     * @param {IModalEventPayload} callback.modal - Modal state object with open and data properties
     * @returns {Function} Unsubscribe function to remove the subscription
     *
     * @example
     * const unsubscribe = modalClient.subscribe('removeUser', ({ open, data }) => {
     *   if (open) {
     *     console.log('Modal opened with data:', data);
     *   }
     * });
     * // Later...
     * unsubscribe();
     */
    subscribe: (
      eventName: string,
      callback: (modal: IModalEventPayload) => void
    ) => {
      return observer.subscribe({
        scope: OBSERVER_SCOPES.MODAL,
        callback: ({ payload }: { payload: IModalEventPayload }) => {
          const { open, data } = payload;
          callback({
            open,
            data,
          });
        },
        eventName,
      });
    },

    /**
     * Opens a modal with the specified name and data.
     *
     * @param {Object} params - Modal parameters
     * @param {string} params.modalName - Name of the modal to open
     * @param {any} params.data - Data to pass to the modal
     *
     * @example
     * modalClient.openModal({
     *   modalName: 'removeUser',
     *   data: { id: 1, name: 'John Doe' }
     * });
     */
    openModal: ({
      modalName: eventName,
      data,
    }: {
      modalName: string;
      data: any;
    }) => {
      dispatchModalEvent({ eventName, payload: { open: true, data } });
    },

    /**
     * Closes a modal with the specified name.
     * Clears the modal data when closing.
     *
     * @param {Object} params - Modal parameters
     * @param {string} params.modalName - Name of the modal to close
     *
     * @example
     * modalClient.closeModal({ modalName: 'removeUser' });
     */
    closeModal: ({ modalName: eventName }: { modalName: string }) => {
      dispatchModalEvent({
        eventName,
        payload: { open: false, data: undefined },
      });
    },
  };
};

export { createModalClient };
