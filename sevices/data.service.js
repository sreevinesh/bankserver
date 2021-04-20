const db = require("./db")

accountDetails = {
    1000: { accno: 1000, name: "userone", balance: 5000, password: "user1" },
    1002: { accno: 1002, name: "usertwo", balance: 5000, password: "user2" },
    1003: { accno: 1003, name: "userthree", balance: 7000, password: "user3" },
    1004: { accno: 1004, name: "userfour", balance: 5000, password: "user4" },
    1005: { accno: 1005, name: "userfive", balance: 3000, password: "user5" },
}
let currentUser

const register = (acno, name, password) => {
    //console.log("register called");

    var accno = parseInt(acno);
    return db.User.findOne({ accno })
        .then(user => {
            // console.log("hiiiiiiiiiiiiiiiii");
            // console.log(user);
            if (user) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "user already exist,please login"
                }
            }
            else {
                const newUser = new db.User({
                    accno,
                    name,
                    balance: 0,
                    password
                })
                console.log(newUser);
                newUser.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "registration sucess"
                }

            }
        })
    // if (accno in accountDetails) {


    //     return {
    //         status: false,
    //         statusCode:422,
    //         message: "user already exist,please login"
    //     }
    // }

    // accountDetails[accno] = {
    //     accno,
    //     balance: 0,
    //     name,
    //     password
    // }
    // console.log(accountDetails);
    // return {
    //     status: true,
    //     statusCode:200,
    //     message: "registration sucessful"
    // }
}


const login = (req,accno, pswd) => {
    var acno = parseInt(accno);
    return db.User.findOne({ accno:acno, password: pswd })
        .then(user => {
            console.log(user);
            if (user) {
             req.session.currentUser=user.accno
                return {
                    status: true,
                    statusCode: 200,
                    message: "login sucess",
                    username:user.name
                }

            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "invalid credentials"
                }

            }
        })

    // //this.getDetails()
    // var dataset = accountDetails;

    // if (accno in dataset) {
    //     var pswd1 = dataset[accno].password
    //     if (pswd1 == pswd) {
    //         req.session.currentUser = dataset[accno].name
    //         // this.saveDetails()

    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: "login sucess"
    //         }
    //     }
    //     else {
    //         return {
    //             status: false,
    //             statusCode: 422,
    //             message: "incorrect password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         status: false,
    //         statusCode: 422,
    //         message: "no user exist,register new one"
    //     }
    // }
}


const deposit = (req,accno, pswd, amt) => {
    var acno = parseInt(accno);
    console.log("hiiii");
    console.log("1="+accno);
    console.log("2="+acno);
    return db.User.findOne({ accno:acno }).then(
        user => {
            if (user) {
                console.log("hello");
                //console.log(user);
                user.balance += parseInt(amt)
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "amount credited",
                    balance: user.balance
                }


            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "invalid user"
                }

            }
        }
    )
    // this.getDetails()


    // var dataset = accountDetails;
    // if (accno in dataset) {
    //     var pswd1 = dataset[accno].password
    //     if (pswd1 == pswd) {
    //         var bal = parseInt(amt)
    //         dataset[accno].balance += bal
    //         // this.saveDetails()
    //         return {
    //             status: true,
    //             statusCode: 200,
    //             message: "amount credicted",
    //             balance: dataset[accno].balance
    //         }
    //         //  alert("amount credicted.new balance:" + this.accountDetails[accno].balance)


    //     }
    //     else {
    //         return {
    //             status: false,
    //             statusCode: 422,
    //             message: "invalid password"
    //         }

    //     }
    // }
    // else {

    //     return {
    //         status: false,
    //         statusCode: 422,
    //         message: "invalid user"
    //     }


    // }
}
const withdraw = (req,accno, pswd, amt) => {
    var acno = parseInt(accno);
    return db.User.findOne({ accno }).then(
        user => {
            if (user) {
                if(user.balance<parseInt(amt)){
                    return{
                    status: false,
                    statusCode: 422,
                    message: "insufficient balance",
                    balance: user.balance
                        }
                }
                else{
                user.balance -= parseInt(amt);
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "amount credicted",
                    balance: user.balance
                }
            }


            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "invalid user",
                }
            }

        })
}
// this.getDetails()
// if(!req.session.currentUser){
//     return {
//         status: false,
//         statusCode:404,
//         message: "please login"
//     }
// }
// var dataset = accountDetails;
// if (accno in dataset) {
//     var pswd1 = dataset[accno].password
//     //console.log(pswd);

//     if (pswd1 == pswd) {
//         var amd = parseInt(amt)
//         if (amd >= dataset[accno].balance) {
//             return {
//                 status: false,
//                 statusCode: 422,
//                 message: "insufficient balance"
//             }
//         }
//         else {
//             dataset[accno].balance -= amd
//             return {
//                 status: true,
//                 statusCode: 200,
//                 message: "amount credicted",
//                 balance: dataset[accno].balance
//             }         // this.saveDetails()
//         }

//     }
//     else {
//         return {
//             status: false,
//             statusCode: 422,
//             message: "invalid user",
//         }
//     }
// }



module.exports = {
    register,
    login,
    deposit,
    withdraw

}

