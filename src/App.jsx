import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RoutesList } from "./components/RoutesList";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container relative" id="main">
        <RoutesList />
      </main>
      <Footer />
    </>
  );
}

export default App;
