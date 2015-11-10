/**
 * Created by akash on 8/11/15.
 */
var about = [
    "facebook",
    "twitter",
    "github",
    "resume",
    "mail"
];
var cmd = [
    "help",
    "about",
    "clear"
];

function abt(temp){
    switch(temp){
        case "facebook":
            echo("Follow this link to view me on FB. <a href = 'https://www.facebook.com/CruiseDevice'>Facebook</a>");
            break;
        case "twitter":
            echo("Also on twitter, follow this link. https://www.twitter.com/CruiseDevice");
            break;
        case "github":
            echo("I like Open Source, and i'am also available on it. https://www.github.com/CruiseDevice");
            break;
        case "resume":
            echo("Figuring out the way to provide my resume here. Don't worry will upload it immediately.");
            break;
        case "mail":

    }
}