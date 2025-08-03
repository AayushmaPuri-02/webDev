const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.'
  }),
  description: Joi.string().max(120).allow(''),
  dueDate: Joi.date().min('now').messages({
    'date.min': 'Due date cannot be in the past.'
  }),
  completed: Joi.boolean()
});

module.exports = taskSchema;