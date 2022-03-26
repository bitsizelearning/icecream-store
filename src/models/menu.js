import { Schema, model } from 'mongoose';

const menuSchema = new Schema(
  {
    name: String,
    description: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Menu = model('menus', menuSchema);
