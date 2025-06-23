import { Posts } from "./components/Posts";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <section className="main-section">
      <Posts></Posts>
      <Footer />
    </section>
  );
};

export default App;