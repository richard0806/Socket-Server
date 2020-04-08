import Server from "./class/server";
import router from "./router/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = new Server();

//Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({ origin: true, credentials: true }));

//Ruta de Servicios
server.app.use("/", router);

//inicio del servicio
server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
