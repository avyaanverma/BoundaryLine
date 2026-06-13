import React from "react";
import { RootProvider } from "./app/providers/RootProviders.jsx";
import BoundaryLineConsole from "./features/boundryline console/pages/BoundryLineConsole.jsx";

export default function App() {
  return (
    <RootProvider>
      <BoundaryLineConsole />
    </RootProvider>
  );
}
