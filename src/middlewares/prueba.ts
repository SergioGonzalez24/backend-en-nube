import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AccountModel } from '../models';

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
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace('Bearer ', '');
            try {
                // Verificar y decodificar el token
                const decodedToken: any = jwt.verify(token, 'YOUR_SECRET_KEY');

                // Obtener el ID de cuenta desde el token decodificado
                const accountId = decodedToken.accountId;

                // Verificar si la cuenta existe en la base de datos
                const account = await AccountModel.findById(accountId);
                if (!account) {
                    return res.status(401).send({ code: 'InvalidTokenException', message: 'The token is not valid' });
                }

                // Asignar el usuario autenticado al objeto "req.user"
                req.user = account;
                next();
            } catch (error) {
                return res.status(401).send({ code: 'InvalidTokenException', message: 'The token is not valid' });
            }
        } else {
            res.status(401).send({ code: 'NoTokenFound', message: 'The token is not present in the request' });
        }
    }
}

export default AccountAuthMiddleware;
