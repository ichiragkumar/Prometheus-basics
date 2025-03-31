import express, { Request, Response, NextFunction } from "express";


const app = express();


function middleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log("Middleware", endTime - startTime);
}


app.use(middleware);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello From user World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});