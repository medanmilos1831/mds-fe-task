import { observer } from "@/libs";
import { OBSERVER_SCOPES, type IModalEventPayload } from "@/types";

const createModalClient = () => {
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
    openModal: ({
      modalName: eventName,
      data,
    }: {
      modalName: string;
      data: any;
    }) => {
      dispatchModalEvent({ eventName, payload: { open: true, data } });
    },
    closeModal: ({ modalName: eventName }: { modalName: string }) => {
      dispatchModalEvent({
        eventName,
        payload: { open: false, data: undefined },
      });
    },
  };
};

export { createModalClient };
