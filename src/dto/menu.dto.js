import { getPaginationInfo } from '../lib/util';

export const getMenuDTO = (menu) => ({
  id: menu._id,
  name: menu.name,
  description: menu.description,
});

export const getMenuResponseDTO = (menus, page, limit, count) => ({
  data: menus.map(getMenuDTO),
  pagination: getPaginationInfo(page, limit, count),
});

export const getMenuByIdResponseDTO = (menu) => ({
  data: getMenuDTO(menu),
});

export const getCreateMenuResponseDTO = (menu) => ({
  message: 'Success create menu',
  id: menu._id,
});

export const getDeleteMenuResponseDTO = (menu) => ({
  message: 'Success delete menu',
  id: menu._id,
});

export const getUpdateMenuResponseDTO = (menu) => ({
  message: 'Success update menu',
  id: menu._id,
  name: menu.name,
  description: menu.description,
});
