#! /usr/bin/env node
import inquirer from "inquirer";

let newUserName, newUserPassword, userName, pinNumber, playAgain;

let totalBalance, userOptions, accountBalance;

let newBalance;



async function startingWindow(){

    newUserName = await inquirer.prompt({
        type:"input",
        name:"setUserName",
        message:"Please set Your User Name for bank account"

    });

    newUserPassword = await inquirer.prompt({
        type:"password",
        mask:'*',
        name:"setUserPassword",
        message:"Please Set your password for account",

        validate: (input) => {
            return (input.length === 6) ? true : 'Input your 6 char password'
          }

    });

    userName = await inquirer.prompt({
        type:"input",
        name:"username",
        message:"Please Enter Your User Name"

    });
    
    pinNumber = await inquirer.prompt({
            type: 'input',
            message:"Please Enter Your Pin Number",
            name:"pin"

        });


 

if (userName.username == newUserName.setUserName && pinNumber.pin == newUserPassword.setUserPassword){
    console.log("You are successfully logged in");
    await operationAtm();
}

else {
    console.log("Your username and password wrong");

}


   
}




async function restartAgain() {
    do {
        await startingWindow();
           playAgain = await inquirer.prompt({
                type:"input",
                name:"restart",
                message:"Do you want to perform another transaction? Press Y or N"
    
            })
            
        } while (playAgain.restart == 'y' || playAgain.restart == 'Y' || playAgain.restart == 'YES' || playAgain.restart == 'Yes' || playAgain.restart == 'yes');
    
}


async function operationAtm() {
    totalBalance = await inquirer.prompt({
        type:"number",
        name:"totalBalance",
        message:"Please Enter Total Amounts"
    
    });
    
    
    userOptions = await inquirer.prompt({
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
    
            newBalance = totalBalance.totalBalance - accountBalance.accountbalance;
    
            console.log(`Your Remaining Balance is ${ newBalance} `);
    
            totalBalance.totalBalance = newBalance;
            
        } else {
    
            console.log("Please Enter another amount");
            
        }
        
    } 
    
    
    else if(userOptions.operator == "Account Balance"){
    
        console.log(`${totalBalance.totalBalance }`);
        
    }



    else if(userOptions.operator == "Inquiry"){
    
        console.log(`Total Ammount is ${totalBalance.totalBalance}`);
    
    }

    else if(userOptions.operator == "Balance Transfer"){
    
      console.log(userOptions.operator);
    
    }
    
    await restartAgain();
}
    
restartAgain();

