/**
 * Created by akash on 8/11/15.
 */
var cmdHist = [""];
var shellPrompt = "~ ";
var currCmd = 0;
var abouts = [
    "facebook",
    "twitter",
    "github",
    "resume",
    "mail"
];
var cmd = {
    "help": help,
    "abt": abt,
    "clear": clear
};

function abt(temp){
    switch(temp){
        case "facebook":
            echo("Follow this link to view me on FB. <a href = 'https://www.facebook.com/CruiseDevice'>Facebook</a>");
            break;
        case "twitter":
            echo("Also on twitter, follow this link. <a href = 'https://www.twitter.com/CruiseDevice'>Twitter</a>");
            break;
        case "github":
            echo("I like Open Source, and i'am also available on it. <a href = 'https://www.github.com/CruiseDevice'>GitHub</a>");
            break;
        case "resume":
            echo("Figuring out the way to provide my resume here. Don't worry will upload it immediately.");
            break;
        case "mail":
            echo("You can mail be by <br/> clickin here <a href = 'mailto:iakashchavan@gmail.com>iakashchavan@gmail.com</a>'");
            break;
        default:
            echo("My Name is Akash and i write code; welcome to my website");
            break;

    }
}
function execute(command){
    stdin.value = "";
    echo(shellPrompt + command);
    if(cmd[command]){
        cmd[command]();
    }else if(abouts.indexOf(command)!==-1){
        abt(command);
    }else if(command){
        echo("bash: command not found: "+command+"<br>try 'help' to find out commands which can help you");
    }
    cmdHist.splice(1,0,command);
    if(cmdHist.length > 32)
        cmdHist.pop();
    currCmd = 0;//Resetting scroll position
    terminal.scrollTop = terminal.scrollHeight;
}
document.addEventListener("DOMContentLoaded",function(event){
    stdin.addEventListener("keydown",function(event){
        switch(event.keyCode){
            case 13:
                execute(stdin.value);
                break;
            case 9:
                event.preventDefault();//Prevents tabbing to URL bar.
                complete(stdin.value);
                break;
            case 38:
                scrollCmdHist("up");
                break;
            case 40:
                scrollCmdHist("down");
                break;
        }
        //separate switch case for keydowns that require Ctrl
        if(event.ctrlKey){
            switch(event.keyCode){
                case 76:
                    clear();
                    break;
                case 78:
                    event.preventDefault();
                    scrollCmdHist("down");
                    break;
                case 80:
                    event.preventDefault();
                    scrollCmdHist("up");
                    break;
            }
        }
    });
    terminal.addEventListener("click",function(event){
        stdin.focus();
    });
});

function clear(){
    strout.innerHTML = "";
}
function help(){
    echo("The available commands are:");
    Object.keys(cmd).concat(abouts).forEach(function(command){
        echo(command);
    });
}
function complete(uncompleted){
    if(uncompleted!==""){
        Object.keys(cmd).concat(abouts).forEach(function(command){
            if(command.indexOf(uncompleted)===0) 
                stdin.value = command;
        });
    }
}
function scrollCmdHist(dir){
    if(dir === "up" && currCmd + 1 < cmdHist.length){
        currCmd++;
    }
    if(dir === "down" && currCmd > 0){
        currCmd--;
    }
    stdin.value = cmdHist[currCmd];
}
function echo(output){
    stdout.innerHTML = stdout.innerHTML + output + "<br>";
}