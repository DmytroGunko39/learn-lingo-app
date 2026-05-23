import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
