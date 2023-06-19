const Joi = require('joi')

const orderSchema = Joi.object({
 user:{
    name:Joi.string().min(1).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
    phone:Joi.number().required(),
    address:Joi.string().required(),
 },
 items:Joi.array().items(
    Joi.object({
        title:Joi.string().required(),
        price:Joi.string().required(),
        qnt:Joi.number().required(),
        _id:Joi.string().required(),
        shopId:Joi.string().required(),
 }))
})

module.exports = {
    orderSchema
}
