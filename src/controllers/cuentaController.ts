import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class CuentaController extends AbstractController {
  protected validateBody(type: any) {
      throw new Error("Method not implemented.");
  }
  private static instance: CuentaController;

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new CuentaController("cuenta");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/deposito",this.authMiddleware.verifyToken, this.deposito.bind(this));
    this.router.post("/retiro",this.authMiddleware.verifyToken, this.retiro.bind(this));
    this.router.get('/saldo',this.authMiddleware.verifyToken, this.saldo.bind(this));
  }

  private async deposito(req: Request, res: Response) {
    try {
      const {email, cantidad} = req.body;
      const saldo = await db['Cuenta'].findAll({
        where: {
          email: email
        }
      });
        const saldo_actual = saldo[0].balance;
        await db['Cuenta'].update({balance: saldo_actual + cantidad}, {
            where: {
                email: email
            }
        });
        res.status(200).send(`se actualizo el saldo`);
      }
      catch (error: any) {
        res
          .status(500)
          .json({ code: error.code, message: error.message })
          .end();
      }
  }


  private async retiro(req: Request, res: Response) {
    try {
      const {email, cantidad} = req.body;
      const saldo = await db['Cuenta'].findAll({
        where: {
          email: email
        }
      });
      if (saldo[0].balance < cantidad){
        throw new Error("No hay saldo suficiente");
      } else{
        const saldo_actual = saldo[0].balance;
        await db['Cuenta'].update({balance: saldo_actual - cantidad}, {
            where: {
                email: email
            }
        });
      }
      
      // Devolver el saldo actual de la cuenta
      res.status(200).send(`se actualizo el saldo`);
    } catch (error: any) {
      res
        .status(500)
        .json({ code: error.code, message: error.message })
        .end();
    }
  }

  private async saldo(req: Request, res: Response) {
    try {
      // Lógica para consultar el saldo de la cuenta
      const {email} = req.body;
      const saldo = await db['Cuenta'].findAll({
        where: {
          email: email
        }
      });
      console.log(saldo);
      // Devolver el saldo actual de la cuenta
      res.status(200).send(`saldo: ${saldo[0].balance}`);
    } catch (error: any) {
      res
        .status(500)
        .json({ code: error.code, message: error.message })
        .end();
    }
  }
}

export default CuentaController;
