const Joi = require('@hapi/joi')

const quizSchema = Joi.object({
  title: Joi.string().required(),
  question: Joi.string().required(),
  difficulty: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),
  type: Joi.string()
    .valid('choice', 'text', 'number')
    .required(),
  choices: Joi.any()
    .when('type', {
      is: Joi.valid('choice'),
      then: Joi.array().items(Joi.string()).required()
    }),
  answer: Joi.any()
    .when('type', {
      is: Joi.valid('number'),
      then: Joi.number().required(),
      otherwise: Joi.string().required()
    }),
  author: Joi.string(),
  author_link: Joi.string()
})

module.exports = {
  quizSchema
}
