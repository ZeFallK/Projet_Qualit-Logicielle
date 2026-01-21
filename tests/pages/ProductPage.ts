import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly boutonAjout: Locator;
    readonly titrePanier: Locator;

    constructor(page: Page) {
        this.page = page;
        // Bouton d'ajout au panier
        this.boutonAjout = page.locator('button[name="add"], form[action*="/cart/add"] button[type="submit"]');
        // Le titre dans le panier (drawer ou page)
        this.titrePanier = page.locator('.cart-drawer__title, h1:has-text("Panier"), .cart-notification');
    }

    async ajouterAuPanier() {
        await this.page.waitForLoadState('domcontentloaded');
        // Parfois il faut scroller pour voir le bouton
        await this.boutonAjout.first().scrollIntoViewIfNeeded();        
        // force: true au cas où une petite animation gêne)
        await this.boutonAjout.first().click({ force: true });
    }

    async verifierPanier() {
        console.log("Vérification de l'ouverture du panier...");
        // pour le tiroir jai mis le delai
        await this.page.waitForTimeout(1000);
        // On cible le bouton de validation ("Checkout") qui a le name checkout sur shopify
        const boutonCommander = this.page.locator('button[name="checkout"], a[href="/checkout"], button:has-text("Paiement"), button:has-text("Commander")').first();
        // jattend qu'il soit visible pour eviter la casse
        await expect(boutonCommander).toBeVisible({ timeout: 15000 });
    }
}