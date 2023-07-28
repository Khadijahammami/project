// Fonction pour valider si une chaîne contient uniquement des lettres
function estUneLettre(chaine) {
    return /^[A-Za-z]+$/.test(chaine);
  }
  
  // Fonction pour valider si une chaîne contient au moins un caractère
  function contientAuMoinsUnCaractere(chaine) {
    return chaine.trim().length > 0;
  }
  // Fonction de validation du formulaire
  function validerFormulaire() {
    var nom = document.querySelector('#pc').value;
    
    var prenom = document.querySelector('#oc').value;
    var email = document.querySelector('input[name="email"]').value;
  
    // Vérification du nom et du prénom
    if (!contientAuMoinsUnCaractere(nom) || !estUneLettre(nom)) {
      alert("Le champ 'nom' doit être rempli avec des lettres.");
      return false;
    }
    if (!contientAuMoinsUnCaractere(prenom) || !estUneLettre(prenom)) {
        alert("Le champ 'prenom' doit être rempli avec des lettres.");
        return false;
      }
}
 

//   Vérification de l'email
   if (!contientAuMoinsUnCaractere(email)) {
    alert("Le champ 'email' doit être rempli.");
    return false;
  }
  {

  return true; // Le formulaire est valide, peut être soumis
}


// Écouteur d'événement pour le soumission du formulaire
document.querySelector('form').addEventListener('submit', function(e) {
  if (!validerFormulaire()) {
    e.preventDefault(); // Empêche la soumission du formulaire si la validation échoue
  }
});




 
  
  
  
