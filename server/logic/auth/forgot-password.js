const getUserByEmail = require('./get-user');
const { sign } = require('jsonwebtoken');

module.exports = async ({ email }) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) throw new Error('user not found');
        const token = sign({ userId: user._id }, process.env.AUTH_TOKEN || '1234', {
            expiresIn: '1h'
        });

        const changeUrl = `http://localhost:3000/password/${token}`;

        // data at this point: 
        // @token needs to be sent to @email as a link to /password/:token
        console.log('go to ', changeUrl);
        return 'password changed'
    } catch (err) {
        throw err;
    }
}