const JOI = require("joi");



// JOI Validations
const baselineValidation = {
    username: JOI.string().required().min(2).max(20).alphanum(),
    firstname: JOI.string().required().min(2).max(20).alphanum(),
    lastname: JOI.string().required().min(2).max(20).alphanum(),
    password: JOI.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/),
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