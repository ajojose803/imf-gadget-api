import express from "express";
import dotenv from "dotenv";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { gadgetRoutes } from "./src/presentation/routes/gadgetRoutes";
import { errorHandler } from "./src/shared/middleware/errorHandler";
import { authRoutes } from "./src/presentation/routes/authRoutes";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");


app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); 
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/gadgets", gadgetRoutes);
app.use("/api/auth", authRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});