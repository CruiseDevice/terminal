"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let cmdHist = [""];
const shellPrompt = "~ ";
let currCmd = 0;
let isTyping = false;
const abouts = [
    "facebook",
    "twitter",
    "github",
    "resume",
    "mail"
];
const asciiArt = `
   _____ _____  _    _ _____  _____ ______   _____  ________      _______ _____ ______
  / ____|  __ \\| |  | |_   _|/ ____|  ____| |  __ \\|  ____\\ \\    / /_   _/ ____|  ____|
 | |    | |__) | |  | | | | | (___ | |__    | |  | | |__   \\ \\  / /  | || |    | |__
 | |    |  _  /| |  | | | |  \\___ \\|  __|   | |  | |  __|   \\ \\/ /   | || |    |  __|
 | |____| | \\ \\| |__| |_| |_ ____) | |____  | |__| | |____   \\  /   _| || |____| |____
  \\_____|_|  \\_\\\\____/|_____|_____/|______| |_____/|______|   \\/   |_____\\_____|______|
`;
// Typing animation
function typeWrite(text_1) {
    return __awaiter(this, arguments, void 0, function* (text, className = "") {
        const stdout = document.getElementById('stdout');
        const span = document.createElement('span');
        if (className)
            span.className = className;
        stdout.appendChild(span);
        for (let i = 0; i < text.length; i++) {
            span.innerHTML += text.charAt(i) === '\n' ? '<br />' : text.charAt(i);
            yield sleep(1);
        }
        stdout.appendChild(document.createElement('br'));
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function echo(output_1) {
    return __awaiter(this, arguments, void 0, function* (output, animated = true, className = "") {
        if (animated && !isTyping) {
            isTyping = true;
            yield typeWrite(output, className);
            isTyping = false;
        }
        else {
            const stdout = document.getElementById('stdout');
            const span = className ? `<span class="${className}">${output}</span>` : output;
            stdout.innerHTML = stdout.innerHTML + span + "<br />";
        }
    });
}
function help() {
    return __awaiter(this, void 0, void 0, function* () {
        yield echo("Available commands:", true, "command-output");
        const commands = Object.keys(cmd).concat(abouts).sort();
        for (const command of commands) {
            yield echo(`  <span class="command-name">${command}</span>`, false);
        }
    });
}
function clear() {
    const stdout = document.getElementById('stdout');
    stdout.innerHTML = "";
}
function ls() {
    return __awaiter(this, void 0, void 0, function* () {
        yield echo("Sections:", true, "command-output");
        yield echo("  <span class='file'>about/</span>     - Personal information", false);
        yield echo("  <span class='file'>projects/</span>  - Portfolio and work", false);
        yield echo("  <span class='file'>skills/</span>    - Technical skills", false);
        yield echo("  <span class='file'>contact/</span>   - Get in touch", false);
    });
}
function whoami() {
    return __awaiter(this, void 0, void 0, function* () {
        yield echo("akash@terminal:~$ Akash Chavan", true, "command-output");
        yield echo("Research Assistant | Chemical Engineering | IIT Bombay", false);
        yield echo("Full Stack Developer | Open Source Enthusiast", false);
    });
}
function projects() {
    return __awaiter(this, void 0, void 0, function* () {
        yield echo("Projects & Work:", true, "command-output");
        yield echo("", false);
        yield echo("  <span class='project-name'>🚀 Terminal Portfolio</span>", false);
        yield echo("     A terminal-style personal website built with TypeScript", false);
        yield echo("     <a href='https://github.com/CruiseDevice/terminal' target='_blank'>View on GitHub</a>", false);
        yield echo("", false);
        yield echo("  For more projects, check out my GitHub: <a href='https://github.com/CruiseDevice'>@CruiseDevice</a>", false);
    });
}
function skills() {
    return __awaiter(this, void 0, void 0, function* () {
        yield echo("Technical Skills:", true, "command-output");
        yield echo("", false);
        yield echo("  <span class='skill-category'>Languages:</span>", false);
        yield echo("    TypeScript, JavaScript, Python, C++", false);
        yield echo("", false);
        yield echo("  <span class='skill-category'>Web Technologies:</span>", false);
        yield echo("    HTML5, CSS3, React, Node.js", false);
        yield echo("", false);
        yield echo("  <span class='skill-category'>Tools & Others:</span>", false);
        yield echo("    Git, Linux, Docker, VS Code", false);
    });
}
function neofetch() {
    return __awaiter(this, void 0, void 0, function* () {
        const info = `
  <span class='neofetch-ascii'>      ___     </span>  <span class='neofetch-label'>user@terminal</span>
  <span class='neofetch-ascii'>     (.. |    </span>  ---------------
  <span class='neofetch-ascii'>     (<> |    </span>  <span class='neofetch-key'>Name:</span> Akash Chavan
  <span class='neofetch-ascii'>    / __  \\   </span>  <span class='neofetch-key'>Role:</span> Research Assistant
  <span class='neofetch-ascii'>   ( /  \\ /|  </span>  <span class='neofetch-key'>Location:</span> IIT Bombay
  <span class='neofetch-ascii'>  _/\\ __)/_)  </span>  <span class='neofetch-key'>Interests:</span> Full Stack Dev, Open Source
  <span class='neofetch-ascii'>  \\/-____\\/   </span>  <span class='neofetch-key'>GitHub:</span> <a href='https://github.com/CruiseDevice'>@CruiseDevice</a>
    `;
        yield echo(info, false);
    });
}
function sudo() {
    return __awaiter(this, void 0, void 0, function* () {
        yield echo("Nice try! 😎", true, "command-output");
        yield echo("But you don't have sudo privileges here... yet.", false);
        yield echo("Try 'help' to see what you CAN do!", false);
    });
}
const cmd = {
    "help": help,
    "abt": abt,
    "clear": clear,
    "ls": ls,
    "whoami": whoami,
    "projects": projects,
    "skills": skills,
    "neofetch": neofetch,
    "sudo": sudo
};
function abt(temp) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (temp) {
            case "facebook":
                yield echo("Follow this link to view me on FB. <a href='https://www.facebook.com/CruiseDevice'>Facebook</a>");
                break;
            case "twitter":
                yield echo("Also on twitter, follow this link. <a href='https://www.twitter.com/CruiseDevice'>Twitter</a>");
                break;
            case "github":
                yield echo("I like Open Source, and I'm also available on it. <a href='https://www.github.com/CruiseDevice'>GitHub</a>");
                break;
            case "resume":
                yield echo("Figuring out the way to provide my resume here. Don't worry will upload it immediately.");
                break;
            case "mail":
                yield echo("You can mail me by <br/> clicking here <a href='mailto:iakashchavan@gmail.com'>iakashchavan@gmail.com</a>");
                break;
            default:
                yield echo("Hello, I'm Akash Chavan, a Research Assistant in the Chemical Engineering department of IIT Bombay.", true, "welcome-msg");
                yield echo("Type <span class='highlight'>help</span> to see what all commands are available", false);
                break;
        }
    });
}
function execute(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const stdin = document.getElementById('stdin');
        const terminal = document.getElementById('terminal');
        stdin.value = "";
        stdin.disabled = true;
        yield echo(shellPrompt + command, false, "user-input");
        if (cmd[command]) {
            yield cmd[command]();
        }
        else if (abouts.indexOf(command) !== -1) {
            yield abt(command);
        }
        else if (command) {
            yield echo("bash: command not found: " + command, true, "error-msg");
            yield echo("Try <span class='highlight'>help</span> to find the available commands", false);
        }
        stdin.disabled = false;
        stdin.focus();
        cmdHist.splice(1, 0, command);
        if (cmdHist.length > 32)
            cmdHist.pop();
        currCmd = 0;
        terminal.scrollTop = terminal.scrollHeight;
    });
}
function complete(uncompleted) {
    const stdin = document.getElementById('stdin');
    if (uncompleted !== "") {
        Object.keys(cmd).concat(abouts).forEach(function (command) {
            if (command.indexOf(uncompleted) === 0)
                stdin.value = command;
        });
    }
}
function scrollCmdHist(dir) {
    const stdin = document.getElementById('stdin');
    if (dir === "up" && currCmd + 1 < cmdHist.length) {
        currCmd++;
    }
    if (dir === "down" && currCmd > 0) {
        currCmd--;
    }
    stdin.value = cmdHist[currCmd];
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const stdout = document.getElementById('stdout');
        // Display ASCII art banner
        stdout.innerHTML = `<pre class="ascii-art">${asciiArt}</pre>`;
        // Show welcome message
        yield abt();
        yield echo("", false);
    });
}
document.addEventListener("DOMContentLoaded", function (event) {
    const stdin = document.getElementById('stdin');
    const terminal = document.getElementById('terminal');
    // Initialize with banner
    init();
    stdin.addEventListener("keydown", function (event) {
        // Prevent input if typing animation is running
        if (isTyping && event.keyCode !== 9 && event.keyCode !== 38 && event.keyCode !== 40) {
            event.preventDefault();
            return;
        }
        switch (event.keyCode) {
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
    terminal.addEventListener("click", function (event) {
        stdin.focus();
    });
});
