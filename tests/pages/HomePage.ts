import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cookieButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookieButton = page.locator('#onetrust-accept-btn-handler');
        // Sélecteur large pour trouver la barre de recherche
        this.searchInput = page.locator('#txtSearch, input[name="search"], input[placeholder*="Rechercher"]');
    }

    async naviguer() {
        await this.page.goto('https://fr.sportsdirect.com/');
    }

    async accepterCookies() {
        try {
            await this.cookieButton.waitFor({ state: 'visible', timeout: 5000 });
            await this.cookieButton.click();
        } catch (e) {
            console.log("Cookies passés");
        }
    }

    async rechercherProduit(produit: string) {
        // On force le clic et la saisie comme vu précédemment
        await this.searchInput.first().waitFor({ state: 'visible' });
        await this.searchInput.first().click({ force: true });
        await this.searchInput.first().pressSequentially(produit, { delay: 100 });
        await this.searchInput.first().press('Enter');
    }

    // NOUVELLE MÉTHODE : On clique spécifiquement sur l'image du premier produit
    async cliquerPremierResultat() {
        // On attend que la liste des résultats (id="navlist") soit chargée
        await this.page.waitForSelector('#navlist', { timeout: 15000 });
        
        // On cible le premier lien (a) dans le premier élément de la liste (li)
        const premierLien = this.page.locator('#navlist > li a').first();
        
        await premierLien.waitFor({ state: 'visible' });
        await premierLien.click();
    }
}