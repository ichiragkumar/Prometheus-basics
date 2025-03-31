import express, { Request, Response, NextFunction } from "express";
import client from "prom-client";
import { requestCountMiddleware } from "./metrics/requestCount";

const app = express();
app.use(express.json())
app.use(requestCountMiddleware)

app.use("/metrics",async (req : Request, res : Response) => {
    const metrics = await client.register.metrics();
    res.set("Content-Type", client.register.contentType);
    res.end(metrics);
})



function middleware(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log("Middleware", endTime - startTime);
}


app.use(middleware);


app.get("/user", (req : Request, res : Response) => {
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.post("/user", (req : Request, res : Response) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});