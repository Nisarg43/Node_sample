const jwt = require('jsonwebtoken');
const token = jwt.sign({ admin: 'bizTech' }, 'secret');

console.log(token);