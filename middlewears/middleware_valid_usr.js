// middlewear -- its a javascript function
export const isValid = (req, res, next) => {
    console.log("Middlewear called");
    
    if(req.session.isValidated) {
        next();
    } else {
        req.session.error = "You have to Login first";
        res.redirect("/login");
    }
}