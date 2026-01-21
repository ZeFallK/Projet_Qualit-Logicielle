import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly iconeLoupe: Locator;
    readonly champRecherche: Locator;
    readonly menuNosParfums: Locator;
    readonly lienHomme: Locator;
    readonly lienFemme: Locator;
    readonly lienUnisexe: Locator;

    constructor(page: Page) {
        this.page = page;
        // Sur Shopify, souvent une icône loupe ou un input direct
        // On cherche un bouton qui contient "Recherche" ou une classe typique
        this.iconeLoupe = page.locator('summary[aria-label="Recherche"], button.search-toggle, .header__search-icon, a[href*="search"]');
        
        // Le champ de saisie réel (souvent name="q")
        this.champRecherche = page.locator('input[name="q"], input[type="search"]');
        this.menuNosParfums = page.locator('summary, button, a').filter({ hasText: 'Nos Parfums' }).first();

        // Les sous-menus (On cherche le lien qui contient le texte spécifique)
        this.lienHomme = page.locator('nav a, ul a').filter({ hasText: 'Homme' }).first();
        this.lienFemme = page.locator('nav a, ul a').filter({ hasText: 'Femme' }).first();
        // Attention : Vérifie le texte exact sur le site ("Mixtes", "Unisexe", "Collection" ?)
        this.lienUnisexe = page.locator('nav a, ul a').filter({ hasText: 'Unisexe' }).first();
    }

    async naviguer() {
        await this.page.goto('https://parfumscollectionprivee.fr/', { waitUntil: 'domcontentloaded' });
        await this.gererPopups();
    }

    async gererPopups() {
        console.log("Tentative de fermeture des popups...");
        try {
            // Fermer bannière cookies (OneTrust ou Shopify standard)
            const btnCookie = this.page.locator('#onetrust-accept-btn-handler, .js-cookie-accept, button:has-text("Accepter")');
            if (await btnCookie.isVisible({ timeout: 4000 })) {
                await btnCookie.click();
            }

            // Fermer popup Newsletter (souvent un bouton "X" ou "Non merci")
            const btnClosePopup = this.page.locator('.newsletter-popup__close, button[aria-label="Fermer"], .popup-close');
            if (await btnClosePopup.isVisible({ timeout: 4000 })) {
                await btnClosePopup.click();
            }
        } catch (e) {
            console.log("Pas de popup bloquante détectée.");
        }
    }

    async rechercher(texte: string) {
        // 1. Si le champ n'est pas visible, on clique sur la loupe
        if (!await this.champRecherche.first().isVisible()) {
            if (await this.iconeLoupe.first().isVisible()) {
                await this.iconeLoupe.first().click();
            }
        }

        // 2. On remplit et valide
        await this.champRecherche.first().waitFor({ state: 'visible' });
        await this.champRecherche.first().fill(texte);
        await this.champRecherche.first().press('Enter');
    }
    async ouvrirMenu() {
        console.log("Ouverture du menu...");
        await this.menuNosParfums.hover();
        await this.page.waitForTimeout(500);
        // Sécurité : clic si le hover ne suffit pas
        if (await this.menuNosParfums.isVisible()) {
             await this.menuNosParfums.click().catch(() => {});
        }
    }
    async cliquerPremierResultat() {
        // Shopify structure : souvent une grille avec des liens contenant "/products/"
        // On évite les liens du menu en cherchant dans le "main" content
        const premierProduit = this.page.locator('main a[href*="/products/"]').first();
        
        await premierProduit.waitFor({ state: 'visible', timeout: 15000 });
        await premierProduit.click();
    }
    async cliquerSurHomme() {
        console.log("Clic sur Homme");
        await this.lienHomme.waitFor({ state: 'visible' });
        await this.lienHomme.click();
    }

    async cliquerSurFemme() {
        console.log("Clic sur Femme");
        await this.lienFemme.waitFor({ state: 'visible' });
        await this.lienFemme.click();
    }

    async cliquerSurUnisexe() {
        console.log("Clic sur Unisexe");
        await this.lienUnisexe.waitFor({ state: 'visible' });
        await this.lienUnisexe.click();
    }
}
