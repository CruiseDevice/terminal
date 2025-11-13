let cmdHist: string[] = [""];
const shellPrompt: string = "~ ";
let currCmd: number = 0;
let isTyping: boolean = false;

const abouts: string[] = [
    "facebook",
    "twitter",
    "github",
    "resume",
    "mail"
]

const asciiArt = `
   _____ _____  _    _ _____  _____ ______   _____  ________      _______ _____ ______
  / ____|  __ \\| |  | |_   _|/ ____|  ____| |  __ \\|  ____\\ \\    / /_   _/ ____|  ____|
 | |    | |__) | |  | | | | | (___ | |__    | |  | | |__   \\ \\  / /  | || |    | |__
 | |    |  _  /| |  | | | |  \\___ \\|  __|   | |  | |  __|   \\ \\/ /   | || |    |  __|
 | |____| | \\ \\| |__| |_| |_ ____) | |____  | |__| | |____   \\  /   _| || |____| |____
  \\_____|_|  \\_\\\\____/|_____|_____/|______| |_____/|______|   \\/   |_____\\_____|______|
`;

// Typing animation
async function typeWrite(text: string, className: string = ""): Promise<void> {
    const stdout = document.getElementById('stdout') as HTMLElement;
    const span = document.createElement('span');
    if (className) span.className = className;
    stdout.appendChild(span);

    for (let i = 0; i < text.length; i++) {
        span.innerHTML += text.charAt(i) === '\n' ? '<br />' : text.charAt(i);
        await sleep(1);
    }
    stdout.appendChild(document.createElement('br'));
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function echo(output: string, animated: boolean = true, className: string = ""): Promise<void> {
    if (animated && !isTyping) {
        isTyping = true;
        await typeWrite(output, className);
        isTyping = false;
    } else {
        const stdout = document.getElementById('stdout') as HTMLElement;
        const span = className ? `<span class="${className}">${output}</span>` : output;
        stdout.innerHTML = stdout.innerHTML + span + "<br />";
    }
}

interface Command {
    [key: string]: () => void | Promise<void>;
}

async function help(): Promise<void> {
    await echo("Available commands:", true, "command-output");
    const commands = Object.keys(cmd).concat(abouts).sort();
    for (const command of commands) {
        await echo(`  <span class="command-name">${command}</span>`, false);
    }
}

function clear(): void {
    const stdout = document.getElementById('stdout') as HTMLElement;
    stdout.innerHTML = "";
}

async function ls(): Promise<void> {
    await echo("Sections:", true, "command-output");
    await echo("  <span class='file'>about/</span>     - Personal information", false);
    await echo("  <span class='file'>projects/</span>  - Portfolio and work", false);
    await echo("  <span class='file'>skills/</span>    - Technical skills", false);
    await echo("  <span class='file'>contact/</span>   - Get in touch", false);
}

async function whoami(): Promise<void> {
    await echo("akash@terminal:~$ Akash Chavan", true, "command-output");
    await echo("Research Assistant | Chemical Engineering | IIT Bombay", false);
    await echo("Full Stack Developer | Open Source Enthusiast", false);
}

async function projects(): Promise<void> {
    await echo("Projects & Work:", true, "command-output");
    await echo("", false);
    await echo("  <span class='project-name'>🚀 Terminal Portfolio</span>", false);
    await echo("     A terminal-style personal website built with TypeScript", false);
    await echo("     <a href='https://github.com/CruiseDevice/terminal' target='_blank'>View on GitHub</a>", false);
    await echo("", false);
    await echo("  For more projects, check out my GitHub: <a href='https://github.com/CruiseDevice'>@CruiseDevice</a>", false);
}

async function skills(): Promise<void> {
    await echo("Technical Skills:", true, "command-output");
    await echo("", false);
    await echo("  <span class='skill-category'>Languages:</span>", false);
    await echo("    TypeScript, JavaScript, Python, C++", false);
    await echo("", false);
    await echo("  <span class='skill-category'>Web Technologies:</span>", false);
    await echo("    HTML5, CSS3, React, Node.js", false);
    await echo("", false);
    await echo("  <span class='skill-category'>Tools & Others:</span>", false);
    await echo("    Git, Linux, Docker, VS Code", false);
}

async function neofetch(): Promise<void> {
    const info = `
  <span class='neofetch-ascii'>      ___     </span>  <span class='neofetch-label'>user@terminal</span>
  <span class='neofetch-ascii'>     (.. |    </span>  ---------------
  <span class='neofetch-ascii'>     (<> |    </span>  <span class='neofetch-key'>Name:</span> Akash Chavan
  <span class='neofetch-ascii'>    / __  \\   </span>  <span class='neofetch-key'>Role:</span> Research Assistant
  <span class='neofetch-ascii'>   ( /  \\ /|  </span>  <span class='neofetch-key'>Location:</span> IIT Bombay
  <span class='neofetch-ascii'>  _/\\ __)/_)  </span>  <span class='neofetch-key'>Interests:</span> Full Stack Dev, Open Source
  <span class='neofetch-ascii'>  \\/-____\\/   </span>  <span class='neofetch-key'>GitHub:</span> <a href='https://github.com/CruiseDevice'>@CruiseDevice</a>
    `;
    await echo(info, false);
}

async function sudo(): Promise<void> {
    await echo("Nice try! 😎", true, "command-output");
    await echo("But you don't have sudo privileges here... yet.", false);
    await echo("Try 'help' to see what you CAN do!", false);
}

const cmd: Command = {
    "help": help,
    "abt": abt,
    "clear": clear,
    "ls": ls,
    "whoami": whoami,
    "projects": projects,
    "skills": skills,
    "neofetch": neofetch,
    "sudo": sudo
}

async function abt(temp?: string): Promise<void> {
    switch(temp) {
        case "facebook":
            await echo("Follow this link to view me on FB. <a href='https://www.facebook.com/CruiseDevice'>Facebook</a>");
            break;
        case "twitter":
            await echo("Also on twitter, follow this link. <a href='https://www.twitter.com/CruiseDevice'>Twitter</a>");
            break;
        case "github":
            await echo("I like Open Source, and I'm also available on it. <a href='https://www.github.com/CruiseDevice'>GitHub</a>");
            break;
        case "resume":
            await echo("Figuring out the way to provide my resume here. Don't worry will upload it immediately.");
            break;
        case "mail":
            await echo("You can mail me by <br/> clicking here <a href='mailto:iakashchavan@gmail.com'>iakashchavan@gmail.com</a>");
            break;
        default:
            await echo("Hello, I'm Akash Chavan, a Research Assistant in the Chemical Engineering department of IIT Bombay.", true, "welcome-msg");
            await echo("Type <span class='highlight'>help</span> to see what all commands are available", false);
            break;
    }
}

async function execute(command: string): Promise<void> {
    const stdin = document.getElementById('stdin') as HTMLInputElement;
    const terminal = document.getElementById('terminal') as HTMLElement;

    stdin.value = "";
    stdin.disabled = true;

    await echo(shellPrompt + command, false, "user-input");

    if(cmd[command]) {
        await cmd[command]();
    } else if(abouts.indexOf(command) !== -1) {
        await abt(command);
    } else if (command) {
        await echo("bash: command not found: " + command, true, "error-msg");
        await echo("Try <span class='highlight'>help</span> to find the available commands", false);
    }

    stdin.disabled = false;
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

async function init(): Promise<void> {
    const stdout = document.getElementById('stdout') as HTMLElement;

    // Display ASCII art banner
    stdout.innerHTML = `<pre class="ascii-art">${asciiArt}</pre>`;

    // Show welcome message
    await abt();
    await echo("", false);
}

document.addEventListener("DOMContentLoaded", function(event) {
    const stdin = document.getElementById('stdin') as HTMLInputElement;
    const terminal = document.getElementById('terminal') as HTMLElement;

    // Initialize with banner
    init();

    stdin.addEventListener("keydown", function(event: KeyboardEvent) {
        // Prevent input if typing animation is running
        if (isTyping && event.keyCode !== 9 && event.keyCode !== 38 && event.keyCode !== 40) {
            event.preventDefault();
            return;
        }

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