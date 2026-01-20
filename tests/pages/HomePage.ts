import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly menuProducts: Locator;
    readonly consentButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Lien vers la page produits dans la navbar
        this.menuProducts = page.locator('a[href="/products"]');
        // Gestion de la bannière de consentement (si elle apparaît)
        this.consentButton = page.locator('.fc-button-label:has-text("Consent"), .fc-cta-consent'); 
    }

    async naviguer() {
        await this.page.goto('https://automationexercise.com/');
        
        // Gestion des popups de consentement Google (fréquent sur ce site)
        try {
            if (await this.consentButton.isVisible({ timeout: 5000 })) {
                await this.consentButton.click();
            }
        } catch (e) {
            // On ignore si pas de popup
        }
    }

    async allerSurPageProduits() {
        await this.menuProducts.first().click();
        // Vérification qu'on est bien arrivé (bonne pratique)
        await expect(this.page).toHaveURL(/.*products/);
    }
}