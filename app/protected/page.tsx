import SignOut from "@/components/sign-out";
import TodoList from "@/app/protected/components/todo-list";
export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <TodoList />
        <div className="absolute bottom-5 w-full flex justify-center items-center">
          <SignOut />
        </div>
      </div>
    </div>
  );
}
