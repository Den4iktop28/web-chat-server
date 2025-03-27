import jwt from 'jsonwebtoken';

export function generateToken(userId, response) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    response.cookie('jwt', token,{
        maxAge: 7 * 24 * 3600 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure:process.env.NODE_ENV !== 'development'
    });
    return token;
}