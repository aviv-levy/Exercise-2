const JOI = require("joi");


// JOI Validations
const baselineValidation = {
    username: JOI.string().required().min(2).max(20).alphanum(),
    password: JOI.string().required().min(8).max(40),
};

// Post Validation
function validatePost(obj) {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}

module.exports = {
    validatePost
};