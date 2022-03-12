import { Schema, model } from 'mongoose';

const menuSchema = new Schema({
  name: String,
  description: String,
});

export const Menu = model('menus', menuSchema);
