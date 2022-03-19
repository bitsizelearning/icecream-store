import { Router } from 'express';
import {
  getCreateMenuResponseDTO,
  getMenuByIdResponseDTO,
  getMenuResponseDTO,
} from '../../dto/menu.dto';
import { NotFoundError } from '../../lib/errors';
import { Menu } from '../../models/menu';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [menus, count] = await Promise.all([
      Menu.find()
        .skip((page - 1) * limit)
        .limit(limit),
      Menu.count(),
    ]);

    res.json(getMenuResponseDTO(menus, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const menu = await Menu.findOne({ _id: id });
    if (!menu) {
      throw new NotFoundError('Id Not Found');
    }
    res.json(getMenuByIdResponseDTO(menu));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const menu = await Menu.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.json(getCreateMenuResponseDTO(menu));
  } catch (error) {
    next(error);
  }
});

export default router;
