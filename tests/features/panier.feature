@supp
Feature: Gestion Panier - Produit Bakara
  Scenario: Ajout et suppression du parfum Bakara
    Given je prépare le test panier sur le site
    When je lance la recherche pour "Bakara"
    And je choisis le premier résultat trouvé
    And je valide l'ajout au panier
    And je clique sur la poubelle pour supprimer
    Then le message "panier est vide" doit s'afficher