import * as express from 'express';
import LoginRouter from './routes/loginRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.routesSelector();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT);
  }

  private routesSelector() :void {
    const login = new LoginRouter();
    this.app.use('/login', login.router);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
