import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cuenta from '../models';

class AccountAuthMiddleware {
    // Singleton
    private static instance: AccountAuthMiddleware;

    public static getInstance(): AccountAuthMiddleware {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountAuthMiddleware();
        return this.instance;
    }

    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        let token; // Variable para almacenar el token
        let clientId; // Variable para almacenar el ID del cliente

        if (req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '');
            try {
                // Verificar y decodificar el token
                const decodedToken: any = jwt.verify(token, 'YOUR_SECRET_KEY');

                // Obtener el ID de cuenta desde el token decodificado
                const accountId = decodedToken.accountId;

                // Obtener el ID del cliente desde el token decodificado (si está presente)
                clientId = decodedToken.clientId;

                // Verificar si la cuenta existe en la base de datos
                const account = await cuenta.findById(accountId);
                if (!account) {
                    return res.status(401).send({ code: 'InvalidTokenException', message: 'The token is not valid' });
                }

                // Asignar el usuario autenticado al objeto "req.user"
                req.user = account;

                // Asignar el ID del cliente al objeto "req.clientId" (opcional)
                req.clientId = clientId;

                next();
            } catch (error) {
                return res.status(401).send({ code: 'InvalidTokenException', message: 'The token is not valid' });
            }
        } else {
            res.status(401).send({ code: 'NoTokenFound', message: 'The token is not present in the request' });
        }

        // Utiliza la variable "token" y "clientId" donde los necesites dentro del middleware
        // Por ejemplo, puedes imprimirlos en la consola:
        console.log('Token:', token);
        console.log('Client ID:', clientId);
    }
}

export default AccountAuthMiddleware;
