import * as express from 'express';
import LoginRouter from './routes/loginRoute';
import TeamsRouter from './routes/teamsRoute';
import MatchesRouter from './routes/matchesRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.config();
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
    this.app.use(LoginRouter);
    this.app.use(TeamsRouter);
    this.app.use(MatchesRouter);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
