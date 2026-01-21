@navigation
Feature: Navigation par catégories

  Scenario: Accès à la catégorie Homme
    # CHANGEMENT ICI : Phrase unique
    Given je commence la navigation sur le site
    When je survole le menu "Nos Parfums"
    And je clique sur le lien "Homme"
    Then je dois voir la page de collection "Homme"
    And je dois voir des produits affichés

  Scenario: Accès à la catégorie Femme
    # CHANGEMENT ICI
    Given je commence la navigation sur le site
    When je survole le menu "Nos Parfums"
    And je clique sur le lien "Femme"
    Then je dois voir la page de collection "Femme"
    And je dois voir des produits affichés

  Scenario: Accès à la catégorie Unisexe
    # CHANGEMENT ICI
    Given je commence la navigation sur le site
    When je survole le menu "Nos Parfums"
    And je clique sur le lien "Unisexe"
    Then je dois voir la page de collection "Unisexe"
    And je dois voir des produits affichés