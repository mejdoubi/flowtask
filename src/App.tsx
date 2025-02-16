import Header from "./components/Header";
import TasksBoard from "./components/TasksBoard";

const App = () => {
  return (
    <>
      <Header />
      <div className="flex gap-4 p-6">
        <TasksBoard />
      </div>
    </>
  );
};

export default App;
