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
    this.router.post("/deposito", this.deposito.bind(this));
    this.router.post("/retiro", this.retiro.bind(this));
    this.router.get("/saldo", this.saldo.bind(this));
  }

  private async deposito(req: Request, res: Response) {
    // Obtener el monto del depósito desde el cuerpo de la solicitud
    const { monto } = req.body;

    try {
      // Lógica para realizar el depósito en la cuenta
      
      // Si el depósito fue exitoso, devolver un mensaje de éxito
      res.status(200).json({ message: "Depósito realizado exitosamente" });
    } catch (error: any) {
      res
        .status(500)
        .json({ code: error.code, message: error.message })
        .end();
    }
  }

  private async retiro(req: Request, res: Response) {
    // Obtener el monto del retiro desde el cuerpo de la solicitud
    const { monto } = req.body;

    try {
      // Lógica para realizar el retiro de la cuenta y verificar si hay saldo suficiente
      
      // Verificar si hay saldo suficiente en la cuenta
      if (saldoSuficiente) {
        // Si hay saldo suficiente, realizar el retiro y devolver un mensaje de éxito
        res.status(200).json({ message: "Retiro realizado exitosamente" });
      } else {
        // Si no hay saldo suficiente, devolver un mensaje de error
        res.status(400).json({ message: "No hay saldo suficiente" });
      }
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

      // Devolver el saldo actual de la cuenta
      res.status(200).json({ saldo: saldoActual });
    } catch (error: any) {
      res
        .status(500)
        .json({ code: error.code, message: error.message })
        .end();
    }
  }
}

export default CuentaController;
