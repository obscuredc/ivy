/** on initialization */
const version = "ivy:rootkit.103";
window.onload = function() {
    document.getElementById("elem-title").innerHTML = version;
    document.getElementById("elem-version").innerHTML = version;    
}
/** terminal apis internal */
var Console = document.getElementById("console-message");
function pmessage(message, type = "normal", auth = "native") {
    /** type should be: 
     * normal,special,special2,alert
     */
    var D = new Date();
    Console.innerHTML += `<p class="normal"><span class="special">${auth}</span><span class="specialchar">@</span>${D.getHours()}:${D.getMinutes()}.${D.getSeconds()}:<span class="${type}">${message}</span></p>`;
}
function rmessage(message) {
    Console.innerHTML += message;
}
/** default message */
pmessage("hello. welcome to the ivy rootkit terminal for google chrome. use \`help\` to discover commands. TIP: use `[COMMAND]~[PARAMETERS]` to call a command", "normal", "system")

/** keyboard input */
var currentcommand = "";
var VoidKeyboard = document.getElementById("IOe");

document.addEventListener("keydown", function(ev) {
    
    switch(ev.key) {
        case "Enter":
            executeCommand(currentcommand);
            currentcommand = "";
            updateVoidKeyboard(currentcommand);
            break;
        case "Backspace":
            if(currentcommand.length > 0) {
                currentcommand = currentcommand.substring(0, currentcommand.length - 1);
            }
            updateVoidKeyboard(currentcommand);
            break;
        case "Shift":
            break;
        case "Control":
            break;
        case "Alt":
            break;
        case "Tab":
            break;
        default:
            if(currentcommand.length < 141 ) {
                currentcommand += ev.key;
            }
            updateVoidKeyboard(currentcommand);
            break;
}
});
function updateVoidKeyboard(word) {
    VoidKeyboard.innerText = word;
}

var commandRegistry = [];
function commandbyname(name) {
    for(i=0; i < commandRegistry.length; i++) {
        if (commandRegistry[i].name == name) {
            return commandRegistry[i];
        }
    }
    return false;
}
/** expects commands in form of: COMMAND~PARAMS */
/** command executor */
class Command {
    constructor(name, onexecute, desc) {
        /** onexecute: ON EXECUTE! param: string of input */
        this.name = name;
        this.onexecute = onexecute;
        this.desc = desc;
    }
    aC() {
        commandRegistry.push(this);
    }
}

function executeCommand(raw) {
    var m=raw.split("~");
    commandbyname(m[0]) == false ? /** invalid */ pmessage(`Error: invalidCommand [Command \`${m[0]}\`]`, "alert", "system") : commandbyname(m[0]).onexecute(m[1]);
}

/** listings */
var Commands = {};
/*
Commands.Exit = new Command("exit", function (p) {
    window.close();
})
Commands.Exit.aC();
*/
Commands.help = new Command("help", function(p) {
    var l = "help";
    for(i = 0; i < commandRegistry.length; i++) {
        l+= `<br><span class="special2">${commandRegistry[i].name}<span>: ${commandRegistry[i].desc}`
    }
    pmessage(l, "special", "native/help");
}, "show all commands")
Commands.help.aC();

Commands.OverwriteHTML = new Command("overwritehtml", function (p) {
    document.write(p);
}, "directly overwrite html content")
Commands.OverwriteHTML.aC();

Commands.Clear = new Command("clear", function (p) {
    Console.innerHTML = "";
}, "clear console")
Commands.Clear.aC();

Commands.Author = new Command("authors", function(p) {
    pmessage("<br>written by obscuredc.", "normal", "native/author")
}, "view author info")
Commands.Author.aC();

Commands.DirectJS = new Command("directjs", function (p) {
    pmessage("evaluated", "alert", "native/directjs");
    eval(p);
}, "directly evaluate javascript")
Commands.DirectJS.aC();

Commands.Version = new Command("version", function (p) {
    pmessage(version, "special", "native/version");
}, "get version info of ivy kit")
Commands.Version.aC();

Commands.TextAreaCMD = new Command("exe as cpy", function(p) {
    pmessage(`<textarea id="cpy-input"></textarea>`, "normal", "native/cpy");
    pmessage(`<button id="cpy-button" onclick="cpyRead()">[SUBMIT]</button>`, "normal", "native/cpy");
}, "paste in a command")
Commands.TextAreaCMD.aC();

function cpyRead() {
    var m = document.getElementById("cpy-input").value;
    currentcommand="";
    updateVoidKeyboard(currentcommand);
    executeCommand("clear");
    executeCommand(m);
}

Commands.HREF = new Command("href", function(p) {
    pmessage(`<br>current href:\`${window.location.href}\``, "normal", "native/href");
}, "get rootkit's current location on the computer")
Commands.HREF.aC();

/** rootkit expose API */
var terminalLocal=0;
var Terminal = {
    Message: pmessage,
    Clear: function() {
        Console.innerHTML = "";
    },
    AddCommand: function(name, onexecute, desc) {
        new Command(name, onexecute, desc).aC();
    },
    ExecuteCommand: function(name) {
        executeCommand(name);
    }
}
