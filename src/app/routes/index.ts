import express from 'express';
import { GadgetRoutes } from '../modules/gadget/gadget.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/gadgets',
    route: GadgetRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
