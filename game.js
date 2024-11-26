// DOM Elements
const playerHealthBar = document.getElementById('player-health');
const monsterHealthBar = document.getElementById('monster-health');
const logMessagesList = document.getElementById('log-messages');
const gameOverSection = document.getElementById('game-over');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
const attackButton = document.getElementById('attack-button');
const specialAttackButton = document.getElementById('special-attack-button');
const healButton = document.getElementById('heal-button');
const surrenderButton = document.getElementById('surrender-button');
const controls = document.getElementById('controls');

let playerHealth = 100;
let monsterHealth = 100;
let currentRound = 0;
let logMessages = [];



// Utility functions
/**
 * Met à jour les barres de santé du joueur et du monstre.
 * Ajuste la largeur des barres de santé en fonction des points de vie restants,
 * en s'assurant qu'elles ne descendent pas en dessous de 0%.
 *
 * @function
 * @global
 * @returns {void} Ne retourne aucune valeur.
 */
function updateHealthBars() {
    // Mise à jour de la barre de vie du joueur
    playerHealthBar.style.width =` ${playerHealth}%` // Utilisation de playerHealth
    if (playerHealth <= 15) {
      playerHealthBar.style.backgroundColor = "red"; // Rouge si <= 15%
    } else if (playerHealth <= 30) {
      playerHealthBar.style.backgroundColor = "orange"; // Orange si <= 30%
    } else {
      playerHealthBar.style.backgroundColor = "green"; // Vert sinon
    }
  
    // Mise à jour de la barre de vie du monstre
    monsterHealthBar.style.width =` ${monsterHealth}%`; // Utilisation de monsterHealth
    if (monsterHealth <= 15) {
      monsterHealthBar.style.backgroundColor = "red"; // Rouge si <= 15%
    } else if (monsterHealth <= 30) {
      monsterHealthBar.style.backgroundColor = "orange" // Orange si <= 30%
    } else {
      monsterHealthBar.style.backgroundColor = "green"; // Vert sinon
    }
  }
  
  updateHealthBars();

/**
 * Ajoute un message de log à l'historique de la bataille.
 * Le message indique qui a effectué une action (joueur ou monstre), le type d'action
 * (attaque ou soin), et la valeur associée. Le message est formaté et inséré en haut de la liste des logs.
 *
 * @function
 * @param {string} who - Indique l'entité ayant effectué l'action. Les valeurs possibles sont `'player'` ou `'monster'`.
 * @param {string} action - Le type d'action effectuée. Les valeurs possibles sont `'heal'` (pour un soin) ou autre (pour une attaque).
 * @param {number} value - La valeur associée à l'action (dégâts ou points de soin).
 * @returns {void} Ne retourne aucune valeur.
 */
function addLogMessage(who, action, value) {
    if(action == "heal"){
        logMessages.push(`${who} has healed himself by ${value} hp`);
    }else if(action == "normalAttack"){
        if(who == "player"){
            logMessages.push(`${who} has attacked the monster and it lost ${value} hp`);
        } else {
            logMessages.push(`The monster has attacked you and you lost ${value} hp`);
        }
    }else if(action == "specialAttack"){
        if(who == "player"){
            logMessages.push(`${who} has used a special attack on monster and lost ${value} hp`);
        } else {
            logMessages.push(`The monster has attacked you and you lost ${value} hp`);
        }
    }
    logMessages.forEach((log)=>{
        logMessagesList.innerHTML = `<li>${log}</li>`;
    });
}

/**
 * Vérifie l'état de santé du joueur et du monstre pour déterminer le gagnant de la partie.
 * 
 * La fonction évalue la vie restante du joueur et du monstre pour déterminer qui a gagné, perdu ou si c'est un match nul.
 * - Si les points de vie du joueur et du monstre sont tous deux inférieurs ou égaux à 0, la fonction déclare un "match nul".
 * - Si les points de vie du joueur sont inférieurs ou égaux à 0, la fonction déclare que le joueur a perdu.
 * - Si les points de vie du monstre sont inférieurs ou égaux à 0, la fonction déclare que le joueur a gagné.
 * 
 * La fonction met également à jour l'affichage du message de fin de jeu et la section de fin de jeu en fonction du résultat.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur. Modifie l'interface utilisateur en fonction du résultat du jeu.
 */
function checkWinner() {
    if (playerHealth <= 0 && monsterHealth <= 0) {
        alert("Match nul !! 😲");
        gameOverSection.style.display = "block";
        let matchNul = document.createElement("p");
        matchNul.innerText = "Match nul: personne n'a gagné ! 😲";
        gameOverSection.appendChild(matchNul);
    } else if (playerHealth <= 0) {
        alert("Player a perdu 😢");
        gameOverSection.style.display = "block";
        let playerLose = document.createElement("p");
        playerLose.innerText = "Player a perdu 😢";
        gameOverSection.appendChild(playerLose);
    } else if (monsterHealth <=0) {
        alert("Player a gagné ! 🎉");
        gameOverSection.style.display = "block";
        let playerWins = document.createElement("p");
        playerWins.innerText = "Player a gagné ! 🎉";
        gameOverSection.appendChild(playerWins);
    }
}

/**
 * Réinitialise les données et l'interface du jeu pour commencer une nouvelle partie.
 * - Restaure les points de vie des deux combattants à leur valeur initiale.
 * - Réinitialise le nombre de rounds et vide les messages de log.
 * - Met à jour les barres de santé et masque la section de fin de jeu.
 * - Désactive le bouton d'attaque spéciale.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function resetGame() {

}


// Actions
/**
 * Gère l'attaque du joueur contre le monstre.
 * - Incrémente le nombre de rounds.
 * - Calcule une valeur aléatoire pour l'attaque et réduit la santé du monstre.
 * - Ajoute un message de log pour l'action du joueur.
 * - Déclenche une contre-attaque par le monstre.
 * - Vérifie si un gagnant peut être déterminé.
 * - Met à jour l'état du bouton d'attaque spéciale.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function attackMonster() {
    // TEST /
    console.log('attackMonster() activé')
    //Incrémenter le nombre de rounds :
    currentRound++;
    // générer une valeur aléatoire pour l'attaque :
    let powerAttack =  Math.floor(Math.random()*10+1);
    monsterHealth -=powerAttack;
    // Contre-attaque du monstre : 
    attackPlayer();
    // // Vérification :
    // checkWinner();
    // // Log :
    // addLogMessage(playerHealth, attack, powerAttack) 
    // MAJ barre de santé joueur :
    updateHealthBars();
}


/**
 * Gère l'attaque du monstre contre le joueur.
 * - Calcule une valeur aléatoire pour l'attaque et réduit la santé du joueur.
 * - Ajoute un message de log pour l'action du monstre.
 * - Vérifie si un gagnant peut être déterminé.
 * - Met à jour les barres de santé à l'écran.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function attackPlayer() {
    // TEST /
    console.log('attackPlayer() activé')
    //Incrémenter le nombre de rounds :
    currentRound++;
    // générer une valeur aléatoire pour l'attaque :
    let powerAttack = Math.floor(Math.random()*10+1);
    playerHealth -=powerAttack;
    // // Log :
    // addLogMessage(monsterHealth, attack, powerAttack);
    // Vérification : 
    //checkWinner();
    // MAJ barre desanté joueur :
    updateHealthBars();

}

/**
 * Gère l'attaque spéciale du joueur contre le monstre.
 * - Augmente le compteur de rounds.
 * - Calcule une valeur d'attaque spéciale aléatoire et réduit la santé du monstre.
 * - Ajoute un message de log pour l'attaque spéciale du joueur.
 * - Déclenche une contre-attaque du monstre.
 * - Vérifie si un gagnant peut être déterminé.
 * - Met à jour l'état du bouton d'attaque spéciale.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function specialAttackMonster() {
    // Incrémenter le nombre de rounds :
    currentRound++;
        // générer une valeur aléatoire pour l'attaque SPEZIAL !! :
        let powerAttackSpecial = Math.floor((Math.random()*10+1)+Math.random()*10+1);
        monsterHealth -=powerAttackSpecial;
     // Log :
    // addLogMessage(monsterHealth, attack, powerAttack);
    // Vérification : 
    //checkWinner();
    // MAJ barre desanté joueur :
    updateHealthBars();
}

/**
 * Permet au joueur de se soigner.
 * - Augmente le compteur de rounds.
 * - Calcule une valeur de soin aléatoire et augmente la santé du joueur, sans dépasser 100.
 * - Ajoute un message de log pour l'action de soin.
 * - Déclenche une attaque du monstre en réponse.
 * - Vérifie si un gagnant peut être déterminé.
 * - Met à jour les barres de santé affichées.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function healPlayer() {
    // Calcule une valeur de soin aléatoire et augmente la santé du joueur, sans dépasser 100.
    if (playerHealth != 100) {
        let healAmount = Math.floor((Math.random() * 100 + 1) - playerHealth);
        // Augmente le compteur de rounds.
        currentRound++;
        // Ajoute un message de log pour l'action de soin.
        addLogMessage("Player", "boit une potion de soin", healAmount);
        // Déclenche une attaque du monstre en réponse.
        attackMonster();
        // Vérifie si un gagnant peut être déterminé.
        checkWinner();
        // Met à jour les barres de santé affichées.
        updateHealthBars();
    } else {
        alert("Player a déjà tous ses points de vie");
    }
}

/**
 * Permet au joueur d'abandonner la partie.
 * - Déclare le monstre comme gagnant en affichant un message de défaite.
 * - Affiche la section de fin de jeu.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function surrenderGame() {
    alert("Player a abandonné la partie : Monster gagne !");
    gameOverSection.style.display = "block";
    let surrender = document.createElement("p");
    surrender.innerText = "Player a lâchement abandonné. Monster gagne ! 💪";
    gameOverSection.appendChild(surrender);
    controls.style.display = "none";
}

// Special attack availability
/**
 * Met à jour l'état du bouton d'attaque spéciale en fonction du nombre de rounds.
 * - Le bouton d'attaque spéciale est activé tous les 3 tours. 
 * - Si le tour courant n'est pas un multiple de 3, le bouton est désactivé.
 *
 * @function
 * @returns {void} Ne retourne aucune valeur.
 */
function updateSpecialAttackButton() {
    if(currentRound >1 && currentRound%3 ==0 ){
        specialAttackButton.removeAttribute('disabled');
        console.log('modulo 3',currentRound)
    }else if(currentRound %3 !=0){
        specialAttackButton.setAttribute('disabled')
    }
}
updateSpecialAttackButton()
// Event Listeners
attackButton.addEventListener('click', attackMonster);
specialAttackButton.addEventListener('click', specialAttackMonster);
healButton.addEventListener('click', healPlayer);
surrenderButton.addEventListener('click', surrenderGame);
restartButton.addEventListener('click', resetGame);

// Initialize Game
resetGame();
