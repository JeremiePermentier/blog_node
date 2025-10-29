import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const data = {
    message: 'Hello depuis ton API en TypeScript !',
    version: '1.0.0',
  };

  res.json(data);
});

export default router;
