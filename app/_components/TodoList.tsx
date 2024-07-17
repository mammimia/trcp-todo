'use client';
import { useState } from 'react';
import { trcp } from '../_trpc/client';
import { z } from 'zod';
import { serverClient } from '@/server';

export default function TodoList({
  initialTodos
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)['getTodos']>>;
}) {
  const [input, setInput] = useState('');

  const addTodo = trcp.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
      setInput('');
    },
    onError: (error) => {
      alert(error.message);
    }
  });
  const removeTodo = trcp.removeTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
    onError: (error) => {
      alert(error.message);
    }
  });
  const doneTodo = trcp.doneTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const getTodos = trcp.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return (
    <div className="flex flex-col gap-4 items-center">
      {getTodos.data?.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center gap-3 bg-[#C8ACD6] rounded-md w-60 h-15 px-3 py-1"
        >
          <input
            id={`check-${todo.id}`}
            type="checkbox"
            checked={!!todo.isDone}
            style={{ zoom: 1.5 }}
            onChange={() => doneTodo.mutate(todo.id)}
          />
          <div className="text-[#2E236C]">{todo.content}</div>
          <button
            className="text-[#2E236C] hover:text-[#2E236C] active:text:bg-[#C8ACD6] justify-end rounded-md w-5 h-10"
            onClick={() => removeTodo.mutate(todo.id)}
          >
            X
          </button>
        </div>
      ))}
      <input
        className="text-black"
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button
        className="bg-[#C8ACD6] hover:bg-[#433D8B] active:hover:bg-[#2E236C] rounded-md w-40 h-10"
        onClick={() => addTodo.mutate(input)}
      >
        Add Todo
      </button>
    </div>
  );
}
