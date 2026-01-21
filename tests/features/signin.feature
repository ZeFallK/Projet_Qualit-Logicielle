@valid_login
Feature: Connexion Client Réussie

Scenario: Connexion avec un compte existant valide
    Given je démarre le test de connexion valide
    When je navigue vers la page de connexion   
    And je saisis mes identifiants valides "jean.dupont@gmail.com" et "Abcd1234."
    Then je dois être redirigé vers mon tableau de bord client
