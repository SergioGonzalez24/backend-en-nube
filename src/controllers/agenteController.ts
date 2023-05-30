import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import { Agent } from "http";

class AgenteController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }
  private static instance: AgenteController;

  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AgenteController("agente");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get(
      "/consultarCuentas",
      this.authMiddleware.verifyToken,
      this.permissionMiddleware.checkIsAgente,
      this.consultarCuentas.bind(this)
    );
    this.router.get(
      "/segmentacion",
      this.authMiddleware.verifyToken,
      this.permissionMiddleware.checkIsAgente,
      this.segmentacion.bind(this)
    );
  }

  private async consultarCuentas(req: Request, res: Response) {
    try {
      const cuentas = await db["Cuenta"].findAll();
      res.status(200).send(cuentas);
    } catch (error: any) {
      res.status(500).json({ code: error.code, message: error.message }).end();
    }
  }

  private async segmentacion(req: Request, res: Response) {
    try {
      const { minimo, maximo } = req.body;
      const { email, cantidad } = req.body;
      const cuentas = await db["Cuenta"].findAll({
        where: {
          balance: {
            [db.Sequelize.Op.between]: [minimo, maximo],
          },
        },
      });

      // Devolver el saldo actual de la cuenta
      if (cuentas.length == 0) {
        throw new Error("No hay cuentas");
      } else {
        res.status(200).send(cuentas);
      }
    } catch (error: any) {
      res.status(500).json({ code: error.code, message: error.message }).end();
    }
  }
}

export default AgenteController;
