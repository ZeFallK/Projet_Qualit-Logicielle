# Projet de Validation QA - Automatisation E2E

Ce projet valide les compétences d'automatisation de tests End-to-End avec **Playwright**, **Cucumber (BDD)** et le modèle **Page Object Model (POM)** en TypeScript.

## 🎯 Site Audité
**Site :** [Parfums Collection Privée](https://parfumscollectionprivee.fr/)
**Type :** E-commerce (Shopify)
**Choix du site :** J'ai choisi ce site car il présente une architecture e-commerce moderne et complexe (Pop-ups, Drawer Panier, Chargement dynamique) qui nécessite des stratégies d'automatisation robustes.

## 🚀 Scénario Testé
Le test couvre le parcours utilisateur critique (Critical Path) :
1. Navigation sur la Home Page (Gestion des Cookies & Pop-ups).
2. Recherche d'un produit via le moteur de recherche.
3. Sélection du premier résultat pertinent.
4. Ajout au panier (Gestion du bouton d'action).
5. Vérification de l'ouverture du panier et de la présence du bouton de commande.

## 🛠️ Stack Technique
* **Langage :** TypeScript
* **Moteur :** Playwright
* **BDD :** Cucumber / Gherkin
* **Pattern :** Page Object Model (POM)

## ⚙️ Installation et Exécution

1. **Installer les dépendances :**
   ```bash
   npm install
   ```
2. **Lancer les tests**
     ```bash
   npx cucumber-js tests/features/
   ```

## 💡 Difficultés Rencontrées & Solutions

Durant ce projet, j'ai dû surmonter plusieurs défis techniques liés à l'automatisation d'un site réel. Par ailleurs j'ai dû changer de site plusieurs fois pour des soucis de blocages par rapport au cookies ou detections anti-bot, comme le demontre certaines branches du projet:

Pop-ups Intrusives : Gestion des bannières cookies et newsletter qui masquaient les éléments.

Solution : Implémentation d'une méthode gererPopups() dans le POM HomePage avec des try/catch.

Sélecteurs Dynamiques : Certains ID changent ou sont dupliqués.

Solution : Utilisation de sélecteurs robustes basés sur les attributs (name="add", action*="/cart") plutôt que le texte seul.

Détection du Panier : Le site utilise parfois un "Drawer" latéral et parfois une redirection.

Solution : Stratégie de validation hybride ciblant le bouton "Checkout/Commander" (élément universel du panier Shopify) plutôt qu'un texte statique.