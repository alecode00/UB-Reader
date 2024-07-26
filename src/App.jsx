import "./styles/app.css";
import { AvailableBooksList } from "../components/AvailableBooksList";
import { ReadingList } from "../components/ReadingList";

function App() {
  return (
    <main className="appContainer">
      <AvailableBooksList />
      <ReadingList />
    </main>
  );
}

export default App;
