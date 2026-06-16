import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../store/index.js";
import { AuthSessionGate } from "../../features/auth/session/AuthSessionGate.jsx";
import { SocketProvider } from "../../shared/services/socket/socket-provider.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const RootProvider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthSessionGate>
          <SocketProvider>
            {children}
          </SocketProvider>
        </AuthSessionGate>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default RootProvider;
