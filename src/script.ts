let cmdHist: string[] = [""];
const shellPrompt: string = "~ ";
let currCmd: number = 0;

const abouts: string[] = [
    "facebook",
    "twitter",
    "github",
    "resume",
    "mail"
]

function echo(output: string): void {
    const stdout = document.getElementById('stdout') as HTMLElement;
    stdout.innerHTML = stdout.innerHTML + output + "<br />";
}

interface Command {
    [key: string]: () => void;
}

function help(): void {
    echo("The available commands are:");
    Object.keys(cmd).concat(abouts).forEach(function(command) {
        echo(command);
    })
}

function clear(): void {
    const stdout = document.getElementById('stdout') as HTMLElement;
    stdout.innerHTML = "";
}

const cmd: Command = {
    "help": help,
    "abt": abt,
    "clear": clear

}

function abt(temp?: string): void {
    console.log('hiello');
    switch(temp) {
        case "facebook":
            echo("Follow this link to view me on FB. <a href='https://www.facebook.com/CruiseDevice'>Facebook</a>");
            break;
        case "twitter":
            echo("Also on twitter, follow this link. <a href='https://www.twitter.com/CruiseDevice'>Twitter</a>");
            break;
        case "github":
            echo("I like Open Source, and I'm also available on it. <a href='https://www.github.com/CruiseDevice'>GitHub</a>");
            break;
        case "resume":
            echo("Figuring out the way to provide my resume here. Don't worry will upload it immediately.");
            break;
        case "mail":
            echo("You can mail me by <br/> clicking here <a href='mailto:iakashchavan@gmail.com'>iakashchavan@gmail.com</a>");
            break;
        default:
            echo("Hello, I'm Akash Chavan, a Research Assistant in the Chemical Engineering department of IIT Bombay. Type `help` to see what all commands are available");
            break;
    }
}

function execute(command: string): void {
    const stdin = document.getElementById('stdin') as HTMLInputElement;
    const terminal = document.getElementById('terminal') as HTMLElement;

    stdin.value = "";
    echo(shellPrompt + command);
    if(cmd[command]) {
        cmd[command]();
    } else if(abouts.indexOf(command) !== -1) {
        abt(command);
        stdin.focus();
    } else if (command) {
        echo("bash: command not found " + command + "<br> try 'help' to find the available commands");
    }
    stdin.focus();
    cmdHist.splice(1, 0, command);
    if(cmdHist.length > 32)
        cmdHist.pop();
    currCmd = 0;
    terminal.scrollTop = terminal.scrollHeight;
}

function complete(uncompleted: string): void {
    const stdin = document.getElementById('stdin') as HTMLInputElement;
    if (uncompleted !== "") {
        Object.keys(cmd).concat(abouts).forEach(function(command) {
            if (command.indexOf(uncompleted) === 0)
                stdin.value = command;
        });
    }
}

function scrollCmdHist(dir: string): void {
    const stdin = document.getElementById('stdin') as HTMLInputElement;
    if (dir === "up" && currCmd + 1 < cmdHist.length) {
        currCmd++;
    }
    if (dir === "down" && currCmd > 0) {
        currCmd--;
    }
    stdin.value = cmdHist[currCmd];
}

document.addEventListener("DOMContentLoaded", function(event) {
    const stdin = document.getElementById('stdin') as HTMLInputElement;
    const terminal = document.getElementById('terminal') as HTMLElement;
    
    abt();
    stdin.addEventListener("keydown", function(event: KeyboardEvent) {
        switch(event.keyCode) {
            case 13:
                execute(stdin.value);
                break;
            case 9:
                event.preventDefault();
                complete(stdin.value);
                break;
            case 38:
                scrollCmdHist("up");
                break;
            case 40:
                scrollCmdHist("down");
                break;
        }
    });
    terminal.addEventListener("click", function(event) {
        stdin.focus();
    })
});