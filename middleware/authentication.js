
import {validateToken} from '../services/authentication.js';

function checkForAuthenticationCookie(cookiename){

    return(req,res,next) =>{
        const tokenCookieValue = req.cookies[cookiename];
        if(!tokenCookieValue){
            req.user = null;  // Explicitly set req.user to null if no token
            return next();    // Continue to the next middleware
        }

        try{
          const userPayload = validateToken(tokenCookieValue);
          req.user=userPayload;
        }catch(error){
            console.log('Invalid token:', error);  // Log error for debugging
            req.user = null;  // Explicitly set req.user to null in case of error
        }

        return next();
    };
};

export default checkForAuthenticationCookie;