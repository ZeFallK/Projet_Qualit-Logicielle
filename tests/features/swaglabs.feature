Feature: Parcours d'achat sur Automation Exercise

  Scenario: Recherche et ajout d'un produit au panier
    Given je suis sur la page d'accueil et je navigue vers "Products"
    When je recherche le produit "Blue Top"
    And j'ajoute le premier produit visible au panier
    Then je dois voir la modale de confirmation "Added!"
# Feature: Gérer des tâches dans TodoMVC

#   # Ce fichier décrit le comportement attendu de l'application sous forme de scénario lisible par tous.
#   # Il suit la syntaxe Gherkin : Given / When / Then (Étant donné / Quand / Alors)
#   # Chaque étape correspond à une action ou une vérification dans l'application.

#   Scenario: Ajouter et gérer des tâches
#     # Étapes métier décrivant l'enchaînement complet sans dépendance à un contexte partagé
#     Given que je suis sur la page TodoMVC
#     When j'ajoute la tâche "coder le module d'authentification"
#     And j'ajoute la tâche "Ecrire les tests unitaires"
#     And j'ajoute la tâche "Déployer sur github"
#     And je complète la tâche "Ecrire les tests unitaires"
#     Then la tâche "Ecrire les tests unitaires" doit être visible
#     And le compteur doit afficher "2 items left"
#     When je clique sur "Clear completed"
#     Then la tâche "Ecrire les tests unitaires" ne doit plus être visible