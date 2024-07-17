import { serverClient } from '@/server';
import TodoList from './_components/TodoList';

export default async function Home() {
  const todos = await serverClient.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#17153B]">
      <TodoList initialTodos={todos} />
    </main>
  );
}
