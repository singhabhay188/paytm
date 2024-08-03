const zod = require('zod');

const loginSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(5)
});

module.exports = loginSchema;