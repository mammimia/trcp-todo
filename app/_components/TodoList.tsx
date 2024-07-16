'use client';
import React, { useState } from 'react';
import { trcp } from '../_trpc/client';
import { Todos } from '@prisma/client';

export default function TodoList() {
  const [input, setInput] = useState('');

  const addTodo = trcp.addTodo.useMutation();
  const getTodos = trcp.getTodos.useQuery();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>{JSON.stringify(getTodos.data)}</div>
      <input
        className="text-black"
        type="text"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button
        className="bg-slate-400 rounded-md w-40 h-10"
        onClick={async () => {
          await addTodo.mutateAsync(input);
          getTodos.refetch();
          setInput('');
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
