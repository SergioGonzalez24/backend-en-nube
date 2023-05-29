import Server from "./providers/Server";
import express from "express";
import cors from 'cors';
import AuthenticationController from "./controllers/AuthenticationController";
import CuentaController from "./controllers/cuentaController";
import AgenteController from "./controllers/agenteController";


const app = new Server({
    port:8080,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true}),
        cors()
    ],
    controllers:[
        AuthenticationController.getInstance(),
        CuentaController.getInstance(),
        AgenteController.getInstance()
    ],
    env:'development'
});

declare global{
    namespace Express{
        interface Request{
            user:string;
            token:string;
        }
    }
}

app.init();