const zod = require('zod');

const signupSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(5),
    firstName:zod.string().min(3),
    lastName: zod.string().optional()
});

module.exports = signupSchema;