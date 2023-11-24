import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/model.js";


class Controller{

    static dashboard_get = (req, res) => {

        // Handle the valid user case
        /*
            req.session.valid_msg = "Congratulation as a Valid User";
            req.session.valid_name = user_matched.name;
        */

        const valid_msg = req.session.valid_msg;
        delete req.session.valid_msg;

        const valid_name = req.session.valid_name;
        delete req.session.valid_name;
        res.render("dashboard.ejs", {valid_msg, valid_name})
    }

    static test_get = (req,res) => {
        res.send("From Controller ");
    }

    static signup_get = (req,res) => {

        //Handle signup of new user
        /*
            req.session.signup_msg = "Please Signup First";
            req.session.signup_usr_email = form_data.name;
        */
       const signup_msg = req.session.signup_msg;
       delete req.session.signup_msg;

       const signup_usr_email = req.session.signup_usr_email;
       delete req.session.signup_usr_email;
        res.render("signup.ejs", {signup_msg, signup_usr_email});
    }

    static signup_post = async(req,res) => {
        // name=&email=&pwd=
        try{
            const form_data = req.body;
            console.log(form_data);

            // res.send(form_data);  // for testing

            const user_matched = await userModel.findOne({email:form_data.email});

            if(!user_matched) {
                // res.send("User is a brand new user");

                const hashed_pwd = await bcrypt.hash(form_data.pwd,12);
                console.log(hashed_pwd);

                const user_to_save = new userModel({
                    name : form_data.name,
                    email : form_data.email,
                    pwd :  hashed_pwd
                });

                const user_saved = await user_to_save.save();

                // res.send(user_saved);

                // These session variables will be used in login_get
                req.session.msg_new = "Welcome as a New User";
                req.session.usr_new = user_saved.name;

                res.redirect("/login");

                res.send(hashed_pwd);


            } else {

                req.session.ex_msg = "This is an Existing User";;
                req.session.ex_usr_name = user_matched.name;

                res.redirect("/login");  // redirecting the existing user to the login page

                // These session variables will be used in login_get
                
                // res.send("User Already exists in DB"); --> previous code
            }

        } catch(err){
            console.log(`Can not save User due to this error below. \n ${err}`);
        }
    }

    static login_get = (req,res) => {

        /* variable reference
            req.session.ex_msg = "This is an Existing User";;
            req.session.ex_usr_name = user_matched.name;
        */

        // Handle the case of existing user
        const ex_msg = req.session.ex_msg;
        delete req.session.ex_msg;

        const ex_usr_name = req.session.ex_usr_name;
        delete req.session.ex_usr_name;


        // Handle the new user case 
        /* 
            req.session.msg_new = "Welcome as a New User";
            req.session.usr_new = user_saved.name;
        */

        const msg_new = req.session.msg_new;
        delete req.session.msg_new;

        const usr_new = req.session.usr_new;
        delete req.session.usr_new;

        // Handle the incorrect password case
        /*
            req.session.pwd_msg = "Please Enter Correct Password";
            req.session.name_wrong_pwd = user_matched.name;
        */

        const pwd_msg = req.session.pwd_msg;
        delete req.session.pwd_msg;

        const name_wrong_pwd = req.session.name_wrong_pwd;
        delete req.session.name_wrong_pwd;

        res.render('login.ejs', {ex_msg, ex_usr_name, usr_new, msg_new, pwd_msg, name_wrong_pwd});

    }

    static login_post = async(req,res) => {
        try {
            const form_data = req.body;

            const user_matched = await userModel.findOne({email:form_data.email});

            if(!user_matched){
                //res.send("Please SignUp First");

                req.session.signup_msg = "Please Signup First";
                req.session.signup_usr_email = form_data.email;

                // Use these session variables in signup_get 
                res.redirect("/signup");

            } else{
                const pwd_matched = await bcrypt.compare(form_data.pwd, user_matched.pwd);

                if(pwd_matched){
                    //res.send("User is validated. Login Successful !!!");

                    // this variable will be used in middleware
                    req.session.isValidated = true;

                    // Use these variables in dashboard_get
                    //req.session.valid_msg = "Congratulation as a Valid User";
                    //req.session.valid_name = user_matched.name;

                    req.session.valid_usr = user_matched.name;

                    res.redirect("/dashboard");
                } else {
                    //res.send("Please enter the correct password !!!");

                    req.session.pwd_msg = "Please Enter Correct Password";
                    req.session.name_wrong_pwd = user_matched.name;

                    // Use above variables in login_get

                    res.redirect("/login");
                }
            }

        }catch(err){
            console.log(`Can not verify User details due to this error below. \n ${err}`);
        }
    }

    static logout_post = (req, res) => {
        req.session.destroy();
        res.redirect("/login");
    };
}



export default Controller; // starting point of method