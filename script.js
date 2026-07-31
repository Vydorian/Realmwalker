// ======================================
// REALMWALKER
// Script Part 1
// ======================================

// ---------- ELEMENTS ----------

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

const progressBar = document.getElementById("progressBar");

// ---------- GAME STATE ----------

let health = 100;
let currentRealm = 0;
let currentChoice = null;

let decisionsMade = 0;
let successfulChoices = 0;

// ---------- REALMS ----------

const realms = [

{
    name: "Asgard",
    story: "Odin asks you to judge a starving family that stole food to survive.",

    choice1: {
        text: "Show Mercy",
        chance: 40,
        success: "Odin admires your compassion. The family shares supplies with you.",
        failure: "The family attacks while escaping.",
        health: 15,
        failHealth: -35
    },

    choice2: {
        text: "Enforce the Law",
        chance: 85,
        success: "Justice is served, but the family resists.",
        failure: "The crowd turns against you.",
        health: -10,
        failHealth: -30
    }
},

{
    name: "Midgard",
    story: "A village is under attack by raiders.",

    choice1: {
        text: "Defend the Village",
        chance: 60,
        success: "The villagers celebrate your bravery.",
        failure: "The raiders overwhelm you.",
        health: 15,
        failHealth: -35
    },

    choice2: {
        text: "Keep Traveling",
        chance: 95,
        success: "You avoid the battle but feel guilty.",
        failure: "A raider ambushes you anyway.",
        health: -15,
        failHealth: -50
    }
},

{
    name: "Jotunheim",
    story: "A Frost Giant carries an injured child toward you.",

    choice1: {
        text: "Help the Child",
        chance: 40,
        success: "The giant was protecting the child and rewards your kindness.",
        failure: "It was a trap.",
        health: 25,
        failHealth: -30
    },

    choice2: {
        text: "Attack First",
        chance: 80,
        success: "You defeat the giant before it strikes.",
        failure: "The giant throws you into the snow.",
        health: -15,
        failHealth: -40
    }
},

{
    name: "Muspelheim",
    story: "A traveler begs you for help crossing a river of lava.",

    choice1: {
        text: "Help Them",
        chance: 35,
        success: "You both survive and they share supplies.",
        failure: "The lava burns you badly.",
        health: 25,
        failHealth: -35
    },

    choice2: {
        text: "Cross Alone",
        chance: 90,
        success: "You survive, but the traveler is left behind.",
        failure: "The bridge collapses beneath you.",
        health: -15,
        failHealth: -45
    }
},

{
    name: "Niflheim",
    story: "A freezing blizzard blocks your path.",

    choice1: {
        text: "Push Through",
        chance: 55,
        success: "You reach shelter and warm yourself.",
        failure: "You become lost in the storm.",
        health: 20,
        failHealth: -35
    },

    choice2: {
        text: "Wait it Out",
        chance: 95,
        success: "You stay safe but lose precious energy.",
        failure: "The cave collapses.",
        health: -20,
        failHealth: -60
    }
},

{
    name: "Vanaheim",
    story: "An ancient forest spirit asks for your help.",

    choice1: {
        text: "Help the Spirit",
        chance: 50,
        success: "Nature restores your strength.",
        failure: "Dark creatures ambush you.",
        health: 25,
        failHealth: -25
    },

    choice2: {
        text: "Ignore It",
        chance: 90,
        success: "You safely continue.",
        failure: "The forest turns against you.",
        health: -20,
        failHealth: -45
    }
},

{
    name: "Alfheim",
    story: "The Light Elves ask you to protect their village.",

    choice1: {
        text: "Stay and Help",
        chance: 45,
        success: "The elves heal your wounds.",
        failure: "Too many enemies surround you.",
        health: 15,
        failHealth: -30
    },

    choice2: {
        text: "Continue Your Quest",
        chance: 90,
        success: "You stay focused on your mission.",
        failure: "Bandits catch you on the road.",
        health: -20,
        failHealth: -45
    }
},

{
    name: "Svartalfheim",
    story: "Dwarves ask you to clear monsters from their mine.",

    choice1: {
        text: "Fight the Monsters",
        chance: 55,
        success: "The dwarves reward your bravery.",
        failure: "The monsters overpower you.",
        health: 20,
        failHealth: -30
    },

    choice2: {
        text: "Decline the Job",
        chance: 95,
        success: "You move on safely.",
        failure: "A monster follows you out.",
        health: -20,
        failHealth: -50
    }
},

{
    name: "Helheim",
    story: "A lonely spirit begs you to guide them home.",

    choice1: {
        text: "Help the Spirit",
        chance: 40,
        success: "The spirit blesses your journey.",
        failure: "It was consumed by darkness.",
        health: 25,
        failHealth: -35
    },

    choice2: {
        text: "Walk Away",
        chance: 90,
        success: "You safely leave Helheim.",
        failure: "Restless spirits attack.",
        health: -15,
        failHealth: -30
    }
}

// END OF REALMS
];

// ---------- START GAME ----------

startButton.onclick = function () {
    titleScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    updateStats();
    loadRealm();
};

// ---------- UPDATE STATS ----------

function updateStats() {

    healthText.textContent =
        health + " (" + getHealthStatus() + ")";

    realmNumber.textContent =
        currentRealm + 1;

    progressBar.style.width =
        ((currentRealm) / realms.length) * 100 + "%";
}

// ---------- HEALTH STATUS ----------

function getHealthStatus() {

    if (health >= 75) {
        return "Healthy";
    }

    if (health >= 40) {
        return "Injured";
    }

    return "Critical";
}

// ---------- LOAD REALM ----------

function loadRealm() {

    updateStats();

    let realm = realms[currentRealm];

    realmName.textContent = realm.name;
    story.textContent = realm.story;

    choice1.innerHTML =
        "<strong>" + realm.choice1.text + "</strong><br>" +
        "<small>Chance of Success: " +
        realm.choice1.chance + "%</small>";

    choice2.innerHTML =
        "<strong>" + realm.choice2.text + "</strong><br>" +
        "<small>Chance of Success: " +
        realm.choice2.chance + "%</small>";

    choice1.onclick = function () {
        currentChoice = realm.choice1;
        rollDice();
    };

    choice2.onclick = function () {
        currentChoice = realm.choice2;
        rollDice();
    };
}// ======================================
// PART 2
// DICE SYSTEM
// ======================================

// ---------- ROLL DICE ----------

function rollDice() {

    choice1.disabled = true;
    choice2.disabled = true;

    resultArea.classList.add("hidden");
    diceArea.classList.remove("hidden");

    // Show required roll BEFORE animation

    const neededRoll = getNeededRoll(currentChoice.chance);

    chanceText.innerHTML =
        "Chance of Success: <strong>" +
        currentChoice.chance +
        "%</strong><br>" +
        "Required Roll: <strong>" +
        neededRoll +
        "+</strong>";

    let animationCount = 0;

    let animation = setInterval(function () {

        diceRoll.textContent =
            Math.floor(Math.random() * 20) + 1;

        animationCount++;

        if (animationCount >= 15) {

            clearInterval(animation);

            finishRoll(neededRoll);

        }

    }, 75);

}

// ---------- NEEDED ROLL ----------

function getNeededRoll(chance) {

    return 21 - Math.round(chance / 5);

}

// ---------- FINISH ROLL ----------

function finishRoll(neededRoll) {

    const roll =
        Math.floor(Math.random() * 20) + 1;

    diceRoll.textContent = roll;

    setTimeout(function () {

        diceArea.classList.add("hidden");
        resultArea.classList.remove("hidden");

        decisionsMade++;

        if (roll >= neededRoll) {

            successfulChoices++;

            health += currentChoice.health;

            showResult(
                true,
                currentChoice.success,
                currentChoice.health,
                roll,
                neededRoll
            );

        } else {

            health += currentChoice.failHealth;

            showResult(
                false,
                currentChoice.failure,
                currentChoice.failHealth,
                roll,
                neededRoll
            );

        }

        updateStats();

    }, 700);

}

// ---------- RESULT ----------

function showResult(success, message, healthChange, roll, neededRoll) {

    if (success) {

        resultTitle.textContent = "SUCCESS!";
        resultTitle.style.color = "#55dd77";

    } else {

        resultTitle.textContent = "FAILURE!";
        resultTitle.style.color = "#ff6666";

    }

    let sign = "";

    if (healthChange > 0) {
        sign = "+";
    }

    resultText.innerHTML =
        "<strong>Your Roll:</strong> " +
        roll +
        "<br>" +

        "<strong>Needed:</strong> " +
        neededRoll +
        "+<br><br>" +

        message +
        "<br><br>" +

        "<strong>Health:</strong> " +
        sign +
        healthChange;

}

// ---------- CONTINUE ----------

continueButton.onclick = function () {

    choice1.disabled = false;
    choice2.disabled = false;

    resultArea.classList.add("hidden");

    currentRealm++;

    // Update progress bar

    progressBar.style.width =
        (currentRealm / realms.length) * 100 + "%";

    // Lose condition

    if (health <= 0) {

        showEnding(
            "Fallen Traveler",
            "Your wounds become too great before reaching the final realm."
        );

        return;

    }

    // Win condition

    if (currentRealm >= realms.length) {

        if (health >= 50) {

            showEnding(
                "Legendary Realmwalker",
                "You crossed every realm through courage, wisdom, and sacrifice."
            );

        } else {

            showEnding(
                "Battle-Scarred Survivor",
                "You survived every realm, but only barely."
            );

        }

        return;

    }

    loadRealm();

};// ======================================
// PART 3
// ENDINGS & HELPERS
// ======================================

// ---------- SHOW ENDING ----------

function showEnding(title, message) {

    document.getElementById("encounter").classList.add("hidden");
    document.getElementById("choices").classList.add("hidden");
    resultArea.classList.add("hidden");
    diceArea.classList.add("hidden");

    ending.classList.remove("hidden");

    endingTitle.textContent = title;

    endingText.innerHTML =
        message +
        "<br><br>" +

        "<strong>Journey Summary</strong><br>" +

        "Realms Completed: " +
        currentRealm +
        " / " +
        realms.length +
        "<br>" +

        "Decisions Made: " +
        decisionsMade +
        "<br>" +

        "Successful Decisions: " +
        successfulChoices +
        "<br>" +

        "Success Rate: " +
        getSuccessRate() +
        "%<br>" +

        "Final Health: " +
        health +
        "<br>" +

        "Health Status: " +
        getHealthStatus() +
        "<br>" +

        "Final Rank: " +
        getRank();

}

// ---------- SUCCESS RATE ----------

function getSuccessRate() {

    if (decisionsMade === 0) {
        return 0;
    }

    return Math.round(
        (successfulChoices / decisionsMade) * 100
    );

}

// ---------- FINAL RANK ----------

function getRank() {

    if (health >= 80) {
        return "Legend of the Nine Realms";
    }

    if (health >= 50) {
        return "Realmwalker";
    }

    if (health >= 20) {
        return "Survivor";
    }

    return "Fallen Hero";

}

// ---------- OPTIONAL COLOR FEEDBACK ----------

function updateHealthColor() {

    if (health >= 75) {

        healthText.style.color = "#66dd66";

    }
    else if (health >= 40) {

        healthText.style.color = "#f2c94c";

    }
    else {

        healthText.style.color = "#ff6666";

    }

}

// ---------- UPDATE STATS ----------
// Replace the updateStats() function from Part 1
// with this version.

function updateStats() {

    healthText.textContent =
        health + " (" + getHealthStatus() + ")";

    updateHealthColor();

    realmNumber.textContent = currentRealm + 1;

    progressBar.style.width =
        (currentRealm / realms.length) * 100 + "%";

}

// ---------- RESET BUTTON ----------

const playAgainButton = ending.querySelector("button");

if (playAgainButton) {

    playAgainButton.onclick = function () {

        location.reload();

    };

}

// ---------- STARTUP ----------

updateStats();

console.log("Realmwalker loaded successfully.");