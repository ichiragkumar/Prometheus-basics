import client from "prom-client";
import  { Request, Response, NextFunction } from "express";
const requestCounter = new client.Counter({
    name:"help_total_requests",
    help:"Total number of requests",
    labelNames:["method","route","status_code"]
})

export const requestCountMiddleware = (req : Request, res : Response, next : NextFunction) => {


    const startTime = Date.now();
    res.on("finish", () =>{
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);



        // increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })

    })

    next()
}
