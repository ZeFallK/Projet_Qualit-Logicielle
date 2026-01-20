import { Page, Locator, expect } from '@playwright/test';

// Cette classe représente la page TodoMVC
// Elle centralise tous les sélecteurs et les actions possibles sur la page
export class TodoPage {

  // Déclaration des éléments (locators)
  readonly page: Page;
  readonly champNouvelleTache: Locator;
  readonly compteurTaches: Locator;
  readonly boutonClearCompleted: Locator;

  constructor(page: Page) {
    this.page = page;

    // Champ d’ajout de nouvelle tâche (en haut)
    this.champNouvelleTache = page.getByPlaceholder('What needs to be done?');


    // Élément affichant le nombre de tâches restantes
    this.compteurTaches = page.locator('[data-testid="todo-count"]');

    // Bouton pour supprimer les tâches complétées
    this.boutonClearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  // Ouvre la page TodoMVC
  async ouvrir() {
    await this.page.goto('https://www.intersport.fr/');
  }

  // Ajoute une nouvelle tâche dans la liste
  async ajouterTache(nom: string) {
    await this.champNouvelleTache.fill(nom);
    await this.champNouvelleTache.press('Enter');
  }

  // Marque une tâche comme complétée (case à cocher)
 async completerTache(nom: string) {
  await this.page.getByRole('listitem').filter({ hasText: nom }).getByLabel('Toggle Todo').check();
 }

  // Vérifie que la tâche est visible
  async verifierTacheVisible(nom: string) {
    await expect (this.page.getByRole('listitem').filter({ hasText: nom })).toBeVisible();
  }

  // Vérifie que la tâche n’est plus visible
  async verifierTacheInvisible(nom: string) {
    await expect (this.page.getByRole('listitem').filter({ hasText: nom })).not.toBeVisible();
  }

  // Vérifie que le compteur affiche le bon nombre de tâches restantes
  async verifierCompteur(valeur: string) {
    await expect(this.compteurTaches).toHaveText(valeur);
  }

  // Supprime les tâches complétées via le bouton "Clear completed"
  async supprimerTachesCompletes() {
    await this.boutonClearCompleted.click();
  }
}