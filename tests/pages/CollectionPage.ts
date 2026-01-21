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
        // On vérifie que le H1 contient le mot (ex: "Hommes")
        await expect(this.titrePage).toContainText(titreAttendu, { ignoreCase: true });
    }

    async verifierProduitsPresents() {
        // On vérifie qu'il y a au moins 1 produit
        await expect(this.listeProduits.first()).toBeVisible();
    }
}