import { TodoService } from './todo.service';
import { TodoForm } from './form/TodoForm';
import { Todo } from '@prisma/client';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    list(): Promise<Todo[]>;
    add(form: TodoForm): Promise<Todo>;
    edit(id: number, form: TodoForm): Promise<Todo>;
    get(id: number): Promise<Todo>;
    remove(id: number): Promise<Todo>;
}
