import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
  }),
};
