import JWT from 'jsonwebtoken';
const secret = "@IamLester123#@";


export function createTokenForUser(user){
  
    const payload = {
        fullname: user.fullname,
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    };

    const token = JWT.sign(payload, secret);
    return token;

}


export function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}
