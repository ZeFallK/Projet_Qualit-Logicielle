import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly boutonAjout: Locator;
    readonly titrePanier: Locator;

    constructor(page: Page) {
        this.page = page;
        // Bouton d'ajout : souvent name="add" ou type="submit" dans un form produit
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

        // 1. On laisse le temps au tiroir latéral de s'ouvrir (animation)
        await this.page.waitForTimeout(1000);

        // 2. On cible le bouton de validation ("Checkout")
        // Sur Shopify, ce bouton a presque toujours le name="checkout" ou s'appelle "Procéder au paiement"
        const boutonCommander = this.page.locator('button[name="checkout"], a[href="/checkout"], button:has-text("Paiement"), button:has-text("Commander")').first();

        // 3. On attend qu'il soit visible.
        // Si ce bouton est visible, c'est la PREUVE que le panier est ouvert.
        await expect(boutonCommander).toBeVisible({ timeout: 15000 });

        // OPTIONNEL : Si tu veux que le test clique vraiment dessus pour aller jusqu'au paiement :
        // await boutonCommander.click();
    }
}