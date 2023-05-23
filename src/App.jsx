import useSWR from "swr";
import "./App.css";
import { getRequest } from "./config/axiosConfig";
import TodoCard from "./components/TodoCard";
import AddTodo from "./components/AddTodo";

// request to get all todos
const getTodos = (url) => getRequest(url);

function App() {
  // add todo mutation
  const { data, error, isLoading, mutate } = useSWR("get-todo", getTodos);

  return (
    <div className="App">
      <h1 className="text-center text-[2rem] font-bold mb-10">
        Todo App ( Swr - Axios - Tailwind )
      </h1>
      <div className="my-10">
        <AddTodo mutate={mutate} />
      </div>
      {isLoading ? (
        <div className="text-center">
          <h1 className="text-[1.4rem] border-2 rounded-lg p-5 text-[black] text-center">
            Loading...
          </h1>
        </div>
      ) : (
        data?.data?.todos?.length === 0 && (
          <div className="text-center">
            <h1 className="text-[1.4rem] border-2 rounded-lg p-5 text-[black] text-center">
              No Todo Found!
            </h1>
          </div>
        )
      )}
      {error && (
        <div className="w-full text-center bg-[red] rounded-lg">
          <h1 className="text-[1.4rem] p-5 text-white text-center">
            Opps! Error
          </h1>
        </div>
      )}
      <div className="grid grid-cols-2 gap-5 mt-20">
        {data?.data?.todos?.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <TodoCard item={item} mutate={mutate} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
