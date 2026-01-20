import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly boutonAjoutPanier: Locator; // On garde un seul locator simple
    readonly modaleConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        
        // --- CORRECTION MAJEURE ICI ---
        // Au lieu de chercher l'overlay compliqué, on prend le bouton "Add to cart"
        // qui se trouve dans la div "productinfo". Il est visible sans survol.
        // On prend le .first() pour être sûr de cliquer sur le premier produit de la liste.
        this.boutonAjoutPanier = page.locator('.productinfo > a.add-to-cart').first();
        
        this.modaleConfirmation = page.locator('#cartModal');
    }

    async rechercherProduit(nom: string) {
        await this.searchInput.fill(nom);
        await this.searchButton.click();
        
        // Vérification avec ignoreCase pour éviter les erreurs de majuscules
        await expect(this.page.locator('.features_items .title')).toContainText('SEARCHED PRODUCTS', { ignoreCase: true });
    }

    async ajouterPremierProduit() {
        // 1. On s'assure que le bouton est bien visible à l'écran (scroll automatique)
        await this.boutonAjoutPanier.scrollIntoViewIfNeeded();

        // 2. On attend explicitement qu'il soit cliquable
        await this.boutonAjoutPanier.waitFor({ state: 'visible' });

        // 3. On clique. On garde "force: true" car parfois une pub ou un pixel dépasse.
        await this.boutonAjoutPanier.click({ force: true });
    }

    async verifierModaleSucces() {
        // On attend que la modale sorte de son état "hidden"
        await expect(this.modaleConfirmation).toBeVisible({ timeout: 10000 });
        await expect(this.modaleConfirmation).toContainText('Added!');
    }
}
