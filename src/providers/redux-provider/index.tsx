import { PropsWithChildren, FC } from "react";
import { Provider } from "react-redux";
import { store } from "./config";

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
