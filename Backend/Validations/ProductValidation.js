const JOI = require("joi");



// JOI Validations
const baselineValidation = {
    name: JOI.string().required().min(2).max(50).alphanum(),
    barcode: JOI.number().integer().min(0).max(Number('15'.repeat(30))).positive().allow(0),
    description: JOI.string().min(2).max(400),
    type: JOI.string().min(2).max(20).alphanum(),
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