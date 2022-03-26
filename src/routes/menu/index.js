import { Router } from 'express';
import {
  getCreateMenuResponseDTO,
  getDeleteMenuResponseDTO,
  getMenuByIdResponseDTO,
  getMenuResponseDTO,
  getUpdateMenuResponseDTO,
} from '../../dto/menu.dto';
import { NotFoundError } from '../../lib/errors';
import { validateObjectId } from '../../middlewares/validations';
import { Menu } from '../../models/menu';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const [menus, count] = await Promise.all([
      Menu.find({ isDeleted: false })
        .skip((page - 1) * limit)
        .limit(limit),
      Menu.count({ isDeleted: false }),
    ]);

    res.json(getMenuResponseDTO(menus, page, limit, count));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateObjectId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const menu = await Menu.findOne({ _id: id, isDeleted: false });
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

router.delete('/:id', validateObjectId, async (req, res, next) => {
  try {
    const deleted = await Menu.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true }
    );
    if (!deleted) {
      throw new NotFoundError('No menu deleted');
    }
    res.json(getDeleteMenuResponseDTO(deleted));
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', validateObjectId, async (req, res, next) => {
  try {
    const toUpdate = {};
    const { name, description } = req.body;
    if (name) toUpdate.name = name;
    if (description) toUpdate.description = description;

    const updated = await Menu.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      toUpdate,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundError('No menu updated');
    }
    res.json(getUpdateMenuResponseDTO(updated));
  } catch (error) {
    next(error);
  }
});

export default router;
