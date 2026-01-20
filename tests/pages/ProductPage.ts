import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly resultatRecherche: Locator;
    readonly boutonAjoutPanier: Locator;
    readonly modaleConfirmation: Locator;
    
    // Sélecteur pour les tailles disponibles (on exclut les "greyOut" ou "disable")
    readonly taillesDisponibles: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Cible le premier produit dans la grille de résultats (image ou lien)
        // On utilise un sélecteur large pour attraper le premier article cliquable
        this.resultatRecherche = page.locator('#navlist > li a, .s-result-item a').first(); 
        
        // Sélecteur intelligent pour les tailles :
        // On cherche dans la liste des tailles (.sizeButtons) un élément qui N'EST PAS grisé (:not(.greyOut))
        this.taillesDisponibles = page.locator('.sizeButtons li:not(.greyOut):not(.disabled)');
        
        // Bouton Ajouter au panier
        this.boutonAjoutPanier = page.locator('#aAddToBag, #addToBag');
        
        // Modale de confirmation (pop-up ou message glissant)
        this.modaleConfirmation = page.locator('#divCartConfirm, .modal-confirmation, #cart-confirmation');
    }

    async cliquerPremierResultat() {
        console.log("Recherche du premier produit...");
        // On attend que la liste s'affiche
        await this.resultatRecherche.waitFor({ state: 'visible', timeout: 15000 });
        
        // On clique
        await this.resultatRecherche.click();
        console.log("Clic effectué sur le produit.");
    }

    async ajouterAuPanier() {
        console.log("Tentative de sélection de taille...");
        
        // 1. Attendre que le conteneur des tailles soit chargé
        await this.page.waitForSelector('.sizeButtons', { timeout: 10000 });

        // 2. Vérifier s'il y a des tailles disponibles
        const nombreTailles = await this.taillesDisponibles.count();
        
        if (nombreTailles > 0) {
            // 3. On prend la première taille disponible (souvent la plus petite en stock)
            // On force le clic car parfois des tooltips gênent
            await this.taillesDisponibles.first().click({ force: true });
            console.log("Taille sélectionnée.");
            
            // Petite pause pour laisser le site digérer le clic (animation visuelle de sélection)
            await this.page.waitForTimeout(500);
        } else {
            console.log("ATTENTION : Aucune taille détectée ou produit taille unique.");
        }

        // 4. On clique sur Ajouter au panier
        await this.boutonAjoutPanier.click();
        console.log("Clic sur Ajouter au panier effectué.");
    }

    async verifierModaleConfirmation() {
        console.log("Attente de la confirmation...");
        await expect(this.modaleConfirmation).toBeVisible({ timeout: 10000 });
    }
}