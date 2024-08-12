const JOI = require("joi");



// JOI Validations
const baselineValidation = {
    name: JOI.string().required().min(2).max(50).alphanum(),
    barcode: JOI.number().integer().min(0).max(Number('9'.repeat(30))).positive().allow(0),
    description: JOI.string().min(2).max(400).alphanum(),
    type: JOI.number().min(1).max(3),
    date: JOI.date().required()
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