Feature: Tunnel d'achat sur Intersport

  Scenario: Recherche d'un produit et ajout au panier
    Given je suis sur la page d'accueil Intersport et j'accepte les cookies
    When je recherche le produit "Chaussures running"
    And je clique sur le premier produit de la liste
    And j'ajoute le produit au panier
    Then la modale de confirmation d'ajout au panier doit être visible

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