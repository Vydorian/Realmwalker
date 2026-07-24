// --------------------
// VARIABLES
// --------------------

const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");

const startButton = document.getElementById("startButton");

const healthText = document.getElementById("health");
const realmNumber = document.getElementById("realmNumber");

const realmName = document.getElementById("realmName");
const story = document.getElementById("story");

const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");

const diceArea = document.getElementById("diceArea");
const diceRoll = document.getElementById("diceRoll");
const chanceText = document.getElementById("chanceText");

const resultArea = document.getElementById("resultArea");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

const continueButton = document.getElementById("continueButton");

const ending = document.getElementById("ending");
const endingTitle = document.getElementById("endingTitle");
const endingText = document.getElementById("endingText");

let health = 100;
let currentRealm = 0;

let currentChoice;

// --------------------
// REALMS
// --------------------

const realms = [

{
name:"Asgard",

story:"Odin asks you to judge a starving family that stole food to survive.",

choice1:{
text:"Show Mercy (40%)",
chance:40,
success:"Odin admires your compassion. The family shares supplies with you.",
failure:"The family attacks while escaping.",
health:15,
failHealth:-25
},

choice2:{
text:"Enforce the Law (85%)",
chance:85,
success:"Justice is served, but the family resists.",
failure:"The crowd turns against you.",
health:-5,
failHealth:-15
}
},

{
name:"Midgard",

story:"A village is under attack by raiders.",

choice1:{
text:"Defend the Village (60%)",
chance:60,
success:"The villagers celebrate your bravery.",
failure:"The raiders overwhelm you.",
health:15,
failHealth:-20
},

choice2:{
text:"Keep Traveling (95%)",
chance:95,
success:"You avoid the battle but feel guilty.",
failure:"A raider ambushes you anyway.",
health:-5,
failHealth:-15
}
},

{
name:"Jotunheim",

story:"A Frost Giant carries an injured child toward you.",

choice1:{
text:"Help the Child (40%)",
chance:40,
success:"The giant was protecting the child and rewards your kindness.",
failure:"It was a trap.",
health:20,
failHealth:-30
},

choice2:{
text:"Attack First (80%)",
chance:80,
success:"You defeat the giant before it strikes.",
failure:"The giant throws you into the snow.",
health:-5,
failHealth:-20
}
},

{
name:"Muspelheim",

story:"A traveler begs you for help crossing a river of lava.",

choice1:{
text:"Help Them (35%)",
chance:35,
success:"You both survive and they share supplies.",
failure:"The lava burns you badly.",
health:20,
failHealth:-30
},

choice2:{
text:"Cross Alone (90%)",
chance:90,
success:"You survive, but the traveler is left behind.",
failure:"The bridge collapses beneath you.",
health:-5,
failHealth:-15
}
},

{
name:"Niflheim",

story:"A freezing blizzard blocks your path.",

choice1:{
text:"Push Through (55%)",
chance:55,
success:"You reach shelter and warm yourself.",
failure:"You become lost in the storm.",
health:15,
failHealth:-25
},

choice2:{
text:"Wait it Out (95%)",
chance:95,
success:"You stay safe but lose precious energy.",
failure:"The cave collapses.",
health:-5,
failHealth:-15
}
},

{
name:"Vanaheim",

story:"An ancient forest spirit asks for your help.",

choice1:{
text:"Help the Spirit (50%)",
chance:50,
success:"Nature restores your strength.",
failure:"Dark creatures ambush you.",
health:20,
failHealth:-25
},

choice2:{
text:"Ignore It (90%)",
chance:90,
success:"You safely continue.",
failure:"The forest turns against you.",
health:-5,
failHealth:-15
}
},

{
name:"Alfheim",

story:"The Light Elves ask you to protect their village.",

choice1:{
text:"Stay and Help (45%)",
chance:45,
success:"The elves heal your wounds.",
failure:"Too many enemies surround you.",
health:20,
failHealth:-30
},

choice2:{
text:"Continue Your Quest (90%)",
chance:90,
success:"You stay focused on your mission.",
failure:"Bandits catch you on the road.",
health:-5,
failHealth:-15
}
},

{
name:"Svartalfheim",

story:"Dwarves ask you to clear monsters from their mine.",

choice1:{
text:"Fight the Monsters (55%)",
chance:55,
success:"The dwarves reward your bravery.",
failure:"The monsters overpower you.",
health:15,
failHealth:-25
},

choice2:{
text:"Decline the Job (95%)",
chance:95,
success:"You move on safely.",
failure:"A monster follows you out.",
health:-5,
failHealth:-15
}
},

{
name:"Helheim",

story:"A lonely spirit begs you to guide them home.",

choice1:{
text:"Help the Spirit (40%)",
chance:40,
success:"The spirit blesses your journey.",
failure:"It was consumed by darkness.",
health:25,
failHealth:-35
},

choice2:{
text:"Walk Away (90%)",
chance:90,
success:"You safely leave Helheim.",
failure:"Restless spirits attack.",
health:-5,
failHealth:-15
}
}

];

// --------------------
// START GAME
// --------------------

startButton.onclick = function(){

titleScreen.classList.add("hidden");
gameScreen.classList.remove("hidden");

loadRealm();

};

// --------------------
// LOAD REALM
// --------------------

function loadRealm(){

let realm = realms[currentRealm];

healthText.textContent = health;
realmNumber.textContent = currentRealm + 1;

realmName.textContent = realm.name;
story.textContent = realm.story;

choice1.textContent = realm.choice1.text;
choice2.textContent = realm.choice2.text;

choice1.onclick = function(){

currentChoice = realm.choice1;
rollDice();

};

choice2.onclick = function(){

currentChoice = realm.choice2;
rollDice();

};

}// --------------------
// D20 ROLL
// --------------------

function rollDice() {

    choice1.disabled = true;
    choice2.disabled = true;

    resultArea.classList.add("hidden");
    diceArea.classList.remove("hidden");

    let count = 0;

    let animation = setInterval(function () {

        diceRoll.textContent = Math.floor(Math.random() * 20) + 1;

        count++;

        if (count >= 15) {

            clearInterval(animation);

            finishRoll();

        }

    }, 75);

}

// --------------------
// FINISH ROLL
// --------------------

function finishRoll() {

    let roll = Math.floor(Math.random() * 20) + 1;

    diceRoll.textContent = roll;

    let needed = 21 - Math.round(currentChoice.chance / 5);

    chanceText.textContent =
        "Needed " + needed + "+ to succeed";

    setTimeout(function () {

        diceArea.classList.add("hidden");

        resultArea.classList.remove("hidden");

        if (roll >= needed) {

            health += currentChoice.health;

            resultTitle.textContent = "SUCCESS!";

            resultText.textContent =
                currentChoice.success +
                " (" +
                (currentChoice.health > 0 ? "+" : "") +
                currentChoice.health +
                " Health)";

        }

        else {

            health += currentChoice.failHealth;

            resultTitle.textContent = "FAILURE!";

            resultText.textContent =
                currentChoice.failure +
                " (" +
                currentChoice.failHealth +
                " Health)";

        }

        healthText.textContent = health;

    }, 700);

}

// --------------------
// CONTINUE
// --------------------

continueButton.onclick = function () {

    choice1.disabled = false;
    choice2.disabled = false;

    resultArea.classList.add("hidden");

    currentRealm++;

    if (health <= 0) {

        showEnding(
            "Fallen Traveler",
            "Your wounds become too great. Your journey ends before you can reach the final realm."
        );

        return;
    }

    if (currentRealm >= realms.length) {

        if (health >= 50) {

            showEnding(
                "Legendary Realmwalker",
                "You survive all Nine Realms through courage, wisdom, and sacrifice. The realms remember your name forever."
            );

        }

        else {

            showEnding(
                "Battle-Scarred Survivor",
                "You barely survive your journey, but your determination carries you through every realm."
            );

        }

        return;

    }

    loadRealm();

};

// --------------------
// ENDING
// --------------------

function showEnding(title, text) {

    document.getElementById("encounter").classList.add("hidden");
    document.getElementById("choices").classList.add("hidden");

    ending.classList.remove("hidden");

    endingTitle.textContent = title;

    endingText.textContent =
        text +
        "\n\nFinal Health: " +
        health;

}