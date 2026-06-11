import { useState } from "react";
import { Provider } from "react-redux";
import ScorerConsolePage from "./features/scorer-console/pages/ScorerConsolePage";
import store from "./store";
import {SocketProvider} from "../src/features/shared/services/socket/socket-provider.jsx"

const App = () => {
  const [viewMode, setViewMode] = useState("CONSOLE");

  const handleViewScoreboard = () => {
    setViewMode("SCOREBOARD");
  };

  return (
    <Provider store={store}>
      <SocketProvider>
        <div className="min-h-screen bg-zinc-950">
          {viewMode === "CONSOLE" ? (
            <ScorerConsolePage
              onViewScoreboard={handleViewScoreboard}
            />
          ) : (
            <div className="flex items-center justify-center min-h-screen text-white">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">
                  Scoreboard View
                </h1>

                <p className="text-zinc-400 mb-6">
                  TODO: Scoreboard component
                </p>

                <button
                  onClick={() =>
                    setViewMode("CONSOLE")
                  }
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg"
                >
                  Back to Console
                </button>
              </div>
            </div>
          )}
        </div>
      </SocketProvider>
    </Provider>
  );
};

export default App;