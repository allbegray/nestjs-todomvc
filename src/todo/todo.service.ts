import { Injectable } from '@nestjs/common';
import { Todo } from './todo';
import { TodoForm } from './form/TodoForm';

@Injectable()
export class TodoService {
  seq = 0;
  todos = new Map<number, Todo>();

  findAll(): Array<Todo> {
    return [...this.todos.values()];
  }

  add(form: TodoForm): Todo {
    const seq = ++this.seq;
    const todo = {
      id: seq,
      ...form,
    };
    this.todos.set(seq, todo);
    return todo;
  }

  update(id: number, form: TodoForm): Todo {
    const todo = {
      ...this.todos.get(id),
      ...form,
    };
    this.todos.set(id, todo);
    return todo;
  }

  findOne(id: number): Todo {
    return this.todos.get(id);
  }

  deleteById(id: number) {
    this.todos.delete(id);
  }
}
