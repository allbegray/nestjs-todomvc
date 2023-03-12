import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
    todo(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<Todo | null>;
    findAll(): Promise<Todo[]>;
    add(data: Prisma.TodoCreateInput): Promise<Todo>;
    update(params: {
        where: Prisma.TodoWhereUniqueInput;
        data: Prisma.TodoUpdateInput;
    }): Promise<Todo>;
    delete(where: Prisma.TodoWhereUniqueInput): Promise<Todo>;
}
