import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Todo 1', createdAt: new Date() },
    { id: 2, text: 'Todo 2', createdAt: new Date() },
    { id: 3, text: 'Todo 3', createdAt: new Date() },
]

export class TodosController {

    // constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ error: 'ID no válido' });

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });

        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: new Date()
        }

        todos.push(newTodo)

        return res.json(`${text} added as Todo succesfully`);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID is required' });

        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(400).json({ error: `Todo with ${id} not found` })

        todo.text = text;

        return res.json({ message: 'Todo updated', todo });
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID is required' });

        const todo = todos.find(todo => todo.id === id);
        if (!todo) return res.status(400).json({ error: `Todo with ${id} not found` })

        todos.splice(todos.indexOf(todo), 1);

        return res.json({ message: `Todo with ID ${id} deleted succesfully` });
    }
}