import RootProvider from "./app/providers/RootProviders.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

const App = () => {
  return (
    <RootProvider>
      <AppRoutes />
    </RootProvider>
  );
};

export default App;
