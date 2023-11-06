const projet = {
    nom: "Application de gestion de projet",
    taches: [
        {
            nom: "s'occuper de la partie front de l'application",
            priorite: "haute"
        },
        {
            nom: "s'occuper de la partie back de l'application",
            priorite: "moyenne"
        },
        {
            nom: "s'occuper de la mise à jour de l'application",
            priorite: "faible"
        },
    ],

    ajoutertache: function(nom, priorite) {
        this.taches.push({ nom: nom, priorite: priorite });
    },

    supprimertache: function(index) {
        this.taches.splice(index, 1);
    },
};

// ====================================================== //
//  CREATION DE LA FONCTION QUI GENERE LA LISTE DES TACHES LES LI ET LES BOUTON SUPPRIMER ET MODIFIER  //
// ====================================================== //

//fonction pour les li 
// Fonction pour créer les éléments de tâche sous forme de cartes
function creerElementTache(tache, index) {
    // Créez un élément de carte (div)
    const carte = document.createElement("div");
    carte.classList.add("carte"); // Ajoutez une classe CSS pour les cartes

    // Créez des éléments de contenu pour la carte
    const nomTache = document.createElement("p");
    nomTache.textContent = `Nom : ${tache.nom}`;

    const prioriteTache = document.createElement("p");
    prioriteTache.textContent = `Priorité : ${tache.priorite}`;

    // Créez un bouton de suppression
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.innerHTML = '<i class="fas fa-trash-alt"></i> Supprimer';
    boutonSupprimer.classList.add("bouton-supprimer");

    boutonSupprimer.addEventListener("click", () => {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
        if (confirmation) {
            projet.supprimertache(index);
            afficherTache();
        }
    });

    // Créez un bouton de modification
    const boutonModifier = document.createElement("button");
    boutonModifier.innerHTML = '<i class="fas fa-edit"></i> Modifier';
    boutonModifier.classList.add("bouton-modifier");

    boutonModifier.addEventListener("click", () => {
        const nouveauNom = prompt("Entrez le nouveau nom de la tâche", tache.nom);
        const nouvellePriorite = prompt("Entrez la nouvelle priorité de la tâche", tache.priorite);
        if (nouveauNom !== null && nouvellePriorite !== null) {
            tache.nom = nouveauNom;
            tache.priorite = nouvellePriorite;
            afficherTache();
        }
    });

    // Ajoutez les éléments au contenu de la carte
    carte.appendChild(nomTache);
    carte.appendChild(prioriteTache);
    carte.appendChild(boutonSupprimer);
    carte.appendChild(boutonModifier);

    return carte;
}


//ici on récupère l'élément UL, où nous allons afficher les tâches
const listeTaches = document.getElementById("liste-taches");

//Ici, on parcourt les tâches du projet et ajoutez-les à la liste UL avec les boutons "Supprimer" et "Modifier"
function afficherTache() {
    //ici on récupère la liste des tâches créées
    listeTaches.innerHTML = "";
    projet.taches.forEach((tache, index) => {
        const elementTache = creerElementTache(tache, index);
        listeTaches.appendChild(elementTache);
    });
}

//ici on récupère les éléments du formulaire
const formulaireTache = document.getElementById("formulaire-tache");
const nomTacheInput = document.getElementById("nom-tache");
const prioriteTacheInput = document.getElementById("priorite-tache");

//ici on gère l'ajout des tâches lorsqu'il y a un clic (donc on attend un événement) 
const ajouterTacheButton = document.getElementById("ajouter-tache");
ajouterTacheButton.addEventListener("click", () => {
    const nomTache = nomTacheInput.value;
    const prioriteTache = prioriteTacheInput.value;

    if (nomTache && prioriteTache) {
        projet.ajoutertache(nomTache, prioriteTache);
        afficherTache(); // Met à jour la liste des tâches après l'ajout
        nomTacheInput.value = ''; // Réinitialise les champs du formulaire
        prioriteTacheInput.value = '';
    }else{
        alert("veuillez saisir le nom et la priorité de votre tâche")
    }
});

afficherTache();
