@achatparfum
Feature: Achat sur Parfums Collection Privée

  Scenario: Recherche d'un parfum et ajout au panier
    Given je suis sur le site Parfums Collection Privée
    When je recherche le parfum "Bois"
    And je clique sur le premier produit des résultats
    And j'ajoute le produit au panier
    Then le panier doit s'ouvrir avec le produit ajouté