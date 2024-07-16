'use client';
import React from 'react';
import { trcp } from '../_trpc/client';

export default function TodoList() {
  const getTodos = trcp.getTodos.useQuery();

  return <div>{JSON.stringify(getTodos.data)}</div>;
}
