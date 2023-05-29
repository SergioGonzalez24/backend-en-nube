// import { Request, Response } from "express";
// import { checkSchema } from "express-validator";
// import AbstractController from "./AbstractController";
// import db from "../models";

// class CuentaController extends AbstractController {
//   protected validateBody(type: any) {
//     throw new Error("Method not implemented.");
//   }

//   // Singleton
//   // Atributo de clase
//   private static instance: CuentaController;
//   // Método de clase
//   public static getInstance(): AbstractController {
//     if (this.instance) {
//       return this.instance;
//     }
//     this.instance = new CuentaController("cuenta");
//     return this.instance;
//   }

//   protected initRoutes(): void {
//     this.router.post("/deposito", this.deposito.bind(this));
//     this.router.post("/retiro", this.retiro.bind(this));
//     this.router.get("/saldo", this.saldo.bind(this));
//   }

//   private async deposito(req: Request, res: Response) {
//     const { cantidad } = req.body;
//     try {
//       // Lógica para realizar un depósito en la cuenta
//       const saldoActual = await db.Cuenta.findOne({ where: { userId: req.user.id } });

//       if (!saldoActual) {
//         // La cuenta no existe
//         return res.status(404).send({ message: "Cuenta no encontrada" });
//       }

//       const saldoNuevo = saldoActual.saldo + cantidad;
//       await db.Cuenta.update({ saldo: saldoNuevo }, { where: { userId: req.user.id } });

//       res.status(200).send({ message: "Depósito realizado con éxito" });
//     } catch (error: any) {
//       res.status(500).send({ code: error.code, message: error.message });
//     }
//   }

//   private async retiro(req: Request, res: Response) {
//     const { cantidad } = req.body;
//     try {
//       // Lógica para realizar un retiro en la cuenta
//       const saldoActual = await db.Cuenta.findOne({ where: { userId: req.user.id } });

//       if (!saldoActual) {
//         // La cuenta no existe
//         return res.status(404).send({ message: "Cuenta no encontrada" });
//       }

//       if (saldoActual.saldo < cantidad) {
//         // No hay suficiente saldo en la cuenta
//         return res.status(400).send({ message: "Saldo insuficiente" });
//       }

//       const saldoNuevo = saldoActual.saldo - cantidad;
//       await db.Cuenta.update({ saldo: saldoNuevo }, { where: { userId: req.user.id } });

//       res.status(200).send({ message: "Retiro realizado con éxito" });
//     } catch (error: any) {
//       res.status(500).send({ code: error.code, message: error.message });
//     }
//   }

//   private async saldo(req: Request, res: Response) {
//     try {
//       // Lógica para consultar el saldo de la cuenta
//       const cuenta = await db.Cuenta.findOne({ where: { userId: req.user.id } });

//       if (!cuenta) {
//         // La cuenta no existe
//         return res.status(404).send({ message: "Cuenta no encontrada" });
//       }

//       res.status(200).send({ saldo: cuenta.saldo });
//     } catch (error: any) {
//       res.status(500).send({ code: error.code, message: error.message });
//     }
//   }
// }

// export default CuentaController;
