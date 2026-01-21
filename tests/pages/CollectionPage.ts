import { Page, Locator, expect } from '@playwright/test';

export class CollectionPage {
    readonly page: Page;
    readonly titrePage: Locator;
    readonly listeProduits: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titrePage = page.locator('h1');
        this.listeProduits = page.locator('a[href*="/products/"]');
    }

    async verifierTitre(titreAttendu: string) {
        await expect(this.titrePage).toContainText(titreAttendu, { ignoreCase: true });
    }

    async verifierProduitsPresents() {
        await expect(this.listeProduits.first()).toBeVisible();
    }
}