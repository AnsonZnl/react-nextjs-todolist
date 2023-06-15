import SignOut from "@/components/sign-out";

export default function Home() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <div className="text-gray-200">TodoList</div>
        <SignOut />
      </div>
    </div>
  );
}
