import { createContext, useContext } from 'react';

export type Modals = "createPortfolio";

export type ModalStates = {
    [key in Modals]: IModalState;
}

export interface IModalState {
    readonly open: boolean;
    readonly setOpen: (value: boolean) => void;
}

const ModalStateContext = createContext<ModalStates | null>(null);

export const ProvideModalState = ModalStateContext.Provider;

export const useModalState = (modal: Modals) => {
    const context = useContext(ModalStateContext);

    return context && context[modal];
}