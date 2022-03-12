import { Router } from 'express';
import { Menu } from '../../models/menu';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const menus = await Menu.find();
    res.json({
      data: menus,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const menu = await Menu.findOne({ _id: id });
    if (!menu) {
      const err = new Error('Id Not Found');
      err.status = 404;
      throw err;
    }
    res.json({
      data: menu,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    menus.push(req.body);
    await Menu.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.json({
      message: 'Success!',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
