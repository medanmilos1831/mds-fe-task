import type { App } from "vue";
import { observer } from "@/libs/observer";
import { OBSERVER_SCOPES } from "@/types";
import type { IModalEventPayload } from "@/types/observer.types";
interface IModalObserver {
  openModal: (params: { modalName: string; data: any }) => void;
  closeModal: (params: { modalName: string }) => void;
  subscribe: (
    eventName: string,
    callback: (modal: IModalEventPayload) => void
  ) => () => void;
}
const modalObserver = {
  install: (app: App) => {
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

    function subscribe(
      eventName: string,
      callback: (modal: IModalEventPayload) => void
    ) {
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
    }

    function openModal({
      modalName: eventName,
      data,
    }: {
      modalName: string;
      data: any;
    }) {
      dispatchModalEvent({ eventName, payload: { open: true, data } });
    }
    function closeModal({ modalName: eventName }: { modalName: string }) {
      dispatchModalEvent({
        eventName,
        payload: { open: false, data: undefined },
      });
    }
    app.provide("modalObserver", {
      openModal,
      closeModal,
      subscribe,
    });
  },
};

export { modalObserver, type IModalObserver };
