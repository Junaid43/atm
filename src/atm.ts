#! /usr/bin/env node
import inquirer from "inquirer";
import showBanner from "node-banner";
import { exit } from "process";

let continueTranscation:boolean = true;

let accountBalance : any;

let newBalance:number;



async function restartAgain() {
    do {
         await operationAtm();  

        } while (continueTranscation);
        
    
}


async function operationAtm() {

    const newUserName:{setUserName:string}  = await inquirer.prompt({
        type:"input",
        name:"setUserName",
        message:"Please set Your User Name for bank account"

    });

   const newUserPassword:{setUserPassword:number} = await inquirer.prompt({
        type:"password",
        mask:'*',
        name:"setUserPassword",
        message:"Please Set your password for account",

        validate: (input) => {
            return (input.length === 6) ? true : 'Input your 6 char password'
          }

    });

    let totalBalance :number = Math.floor(Math.random()*10000);

    const userSignUpData = {
        userName : newUserName.setUserName,
        userPassword: newUserPassword.setUserPassword,
        amount : totalBalance
    }


    if(userSignUpData.userName != '' && userSignUpData.userPassword !=null){


        console.log("Welcome to Starting Window of ATM Machine");

        const userName = await inquirer.prompt({
            type:"input",
            name:"username",
            message:"Please Enter Your User Name"
    
        });
        
       const pinNumber = await inquirer.prompt({
                type: 'input',
                message:"Please Enter Your Pin Number",
                name:"pin"
    
            });

             
        if (userName.username == newUserName.setUserName && pinNumber.pin == newUserPassword.setUserPassword){
            console.log("You are successfully logged in");

            const userOptions : {operator: "Cash Withdraw" | "Account Balance" | "Inquiry" | "Balance Transfer"} = await inquirer.prompt({
                type:"list",
                name:"operator",
                message:"Choose any operation you want to perform",
                choices:["Cash Withdraw", "Account Balance","Inquiry","Balance Transfer"]
            
            });
            
            
            if (userOptions.operator == "Cash Withdraw") {
            
                
                accountBalance = await inquirer.prompt({
                    type:"number",
                    name:"accountbalance",
                    message:"Please Enter Amount",
                    validate: (input) => {
        
                        if(isNaN(input)){
                            console.log("please enter valid number");
        
                            return false
                        }
        
                        else{
                            return true
                        }
                        
                      }
            
                });
            
            if (accountBalance.accountbalance  <=25000) {
            
                    console.log(`You successfully withdraw Amount ${accountBalance.accountbalance}`);
            
                    newBalance = userSignUpData.amount - accountBalance.accountbalance;
            
                    console.log(`Your Remaining Balance is ${ newBalance} `);

                    continueTranscation=false;
                    
                } 
                else {
            
                    console.log("Please Enter another amount");
                    continueTranscation=false;
                    
                }
                
            } 
            
            
            else if(userOptions.operator == "Account Balance"){
            
                console.log(`Your Account Balance is ${totalBalance }`);
                continueTranscation=false;
                
            }
        
        
            else if(userOptions.operator == "Inquiry"){
            
                console.log(`Total Ammount is ${totalBalance}`);

                continueTranscation = false;
            
            }
        
            else if(userOptions.operator == "Balance Transfer"){
            
           

              const bankDetails : {bankoptions: "HBL" | "ABL" | "Meezan Bank" } = await inquirer.prompt({
                type:"list",
                name:"bankoptions",
                message:"Choose any Bank you want to transfer",
                choices:["HBL", "ABL","Meezan Bank"]
            
            });


                if(bankDetails.bankoptions == "HBL"){
                    
                
                    const amountToTransferHBL:{accountBalance:number} = await inquirer.prompt({
                        type:"number",
                        name:"accountbalance",
                        message:"How many Amount you want to transfer",
                        validate: (input) => {
            
                            if(isNaN(input)){
                                console.log("please enter valid number");
            
                                return false
                            }
            
                            else{
                                return true
                            }
                            
                        }
                
                    });
                    
                    if (userSignUpData.amount > amountToTransferHBL.accountBalance){

                    userSignUpData.amount = userSignUpData.amount - amountToTransferHBL.accountBalance ;

                    console.log(`Your Remaining Balance is ${userSignUpData.amount}`);
                    }

                    else{
                        console.log("Your Balance is insufficient");
                    }

                } 

                else if(bankDetails.bankoptions == "ABL"){
                    
                
                    const amountToTransferABL:{accountBalance:number} = await inquirer.prompt({
                        type:"number",
                        name:"accountbalance",
                        message:"How many Amount you want to transfer",
                        validate: (input) => {
            
                            if(isNaN(input)){
                                console.log("please enter valid number");
            
                                return false
                            }
            
                            else{
                                return true
                            }
                            
                        }
                
                    });
                    
                    if (userSignUpData.amount > amountToTransferABL.accountBalance){

                    userSignUpData.amount = userSignUpData.amount - amountToTransferABL.accountBalance ;

                    console.log(`Your Remaining Balance is ${userSignUpData.amount}`);
                    }

                    else{
                        console.log("Your Balance is insufficient");
                    }

                } 


                else if(bankDetails.bankoptions == "Meezan Bank"){
                    
                
                    const amountToTransferMeezan:{accountBalance:number} = await inquirer.prompt({
                        type:"number",
                        name:"accountbalance",
                        message:"How many Amount you want to transfer",
                        validate: (input) => {
            
                            if(isNaN(input)){
                                console.log("please enter valid number");
            
                                return false
                            }
            
                            else{
                                return true
                            }
                            
                        }
                
                    });
                    
                    if (userSignUpData.amount > amountToTransferMeezan.accountBalance){

                    userSignUpData.amount = userSignUpData.amount - amountToTransferMeezan.accountBalance ;

                    console.log(`Your Remaining Balance is ${userSignUpData.amount}`);
                    }

                    else{
                        console.log("Your Balance is insufficient");
                    }

                } 

            
            }

           
        }

        else {
            console.log("Your username and password wrong");
            continueTranscation=false;
        }
    
    
    }
   
    
}


(async () => {
    await showBanner('Welcome to ATM Machine', 'ATM Functionality', "red", "green");
})();
    

setTimeout(() => {
    restartAgain();
}, 1000);
