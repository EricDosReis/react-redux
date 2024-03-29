import { Provider as ReduxProvider } from "react-redux";

import { Player } from "./pages/Player";
import { store } from "./store";
import './styles/global.css';

export function App() {
  return (
    <ReduxProvider store={store}>
      <Player />
    </ReduxProvider>
  )
}
