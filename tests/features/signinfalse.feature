@signinfalse
Feature: Gestion du compte utilisateur
  Scenario: Tentative de connexion avec des identifiants invalides
    Given je commence la connexion sur le site Parfums Collection Privée
    When je navigue vers la page de connexion
    And je tente de me connecter avec "test@test.com" et "mauvaispassword"
    Then je dois voir un message d'erreur d'authentification
