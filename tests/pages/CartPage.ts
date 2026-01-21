import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly boutonPoubelle: Locator;
    readonly messageVide: Locator;

    constructor(page: Page) {
        this.page = page;
        this.boutonPoubelle = page.locator('.cart-item__remove, a[href*="/cart/change"], button.cart-remove').first();
        // message qui apparait quand c'est vide
        this.messageVide = page.locator('h1, h2, p').filter({ hasText: /vide/i });
    }

    async supprimerArticle() {
        console.log("Clic sur la poubelle...");
        // On attend que le tiroir soit stable
        await this.page.waitForTimeout(1000);        
        await expect(this.boutonPoubelle).toBeVisible();
        await this.boutonPoubelle.click();        
        // On attend que la page réagisse
        await this.page.waitForTimeout(2000);
    }

    async verifierPanierVide() {
        console.log("Vérification panier vide...");
        await expect(this.messageVide.first()).toBeVisible({ timeout: 10000 });
        console.log("✅ Panier vidé avec succès !");
    }
}