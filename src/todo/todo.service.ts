import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async todo(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    return this.prisma.todo.findMany(params);
  }

  add(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { data, where } = params;
    return this.prisma.todo.update({
      data,
      where,
    });
  }

  delete(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({
      where,
    });
  }
}
