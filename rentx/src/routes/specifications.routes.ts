import { Router } from 'express';
import { ensureAuthenticate } from 'middlewares/ensureAuthenticate';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuthenticate);
specificationsRoutes.post('/', createSpecificationController.handle);

specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
