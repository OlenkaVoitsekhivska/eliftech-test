
const requestError = require('./requestError')

const validationWrapper = (schema) =>{
 {
    const func = async (req, _, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(requestError(400, error.message));
      }
      next();
    };
  
    return func;
  };
}

module.exports = {validationWrapper}