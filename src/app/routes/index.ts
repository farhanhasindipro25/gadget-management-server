import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { GadgetRoutes } from '../modules/gadget/gadget.routes';
import { SalesRoutes } from '../modules/sales/sales.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/gadgets',
    route: GadgetRoutes,
  },
  {
    path: '/sales',
    route: SalesRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
