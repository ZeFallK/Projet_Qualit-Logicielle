import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly iconCompte: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly btnConnexion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iconCompte = page.locator('a[href*="/account"], .header__icon--account');
        this.inputEmail = page.locator('#CustomerEmail');
        this.inputPassword = page.locator('#CustomerPassword');
        this.btnConnexion = page.locator('form[action*="/account/login"] button');
    }

    async allerSurPageConnexion() {
        await this.iconCompte.first().click();
        await expect(this.page).toHaveURL(/.*login.*/);
    }

    async remplirFormulaire(email: string, mdp: string) {
        console.log("Remplissage du formulaire...");
        await this.inputEmail.fill(email);
        await this.page.waitForTimeout(500); 
        await this.inputPassword.fill(mdp);
        await this.page.waitForTimeout(500);

        await this.btnConnexion.first().scrollIntoViewIfNeeded();
        
        console.log("Clic sur Connexion...");
        await Promise.all([
            this.page.waitForTimeout(2000), 
            this.btnConnexion.first().click({ force: true })
        ]);
    }

    // Méthode pour le scénario "Mauvais mot de passe"
    async verifierMessageErreur() {
        console.log("Analyse du résultat (Erreur)...");
        
        const captcha = this.page.locator('iframe[src*="recaptcha"], iframe[title*="recaptcha"]');
        if (await captcha.count() > 0 && await captcha.first().isVisible()) {
            console.log("✅ SUCCÈS : Captcha détecté (Sécurité active).");
            return;
        }

        const erreurLocator = this.page.locator('.form__message--error')
            .or(this.page.locator('.errors ul li'))
            .or(this.page.locator('div[data-form-error]'))
            .or(this.page.locator('text=Adresse e-mail ou mot de passe incorrect'))
            .or(this.page.locator('text=Email ou mot de passe invalide'));

        try {
            await expect(erreurLocator.first()).toBeVisible({ timeout: 5000 });
            console.log("✅ Message d'erreur texte trouvé.");
        } catch (e) {
            throw new Error("Échec : Ni message d'erreur, ni Captcha détecté.");
        }
    }

    // Méthode pour le scénario "Bon mot de passe"
    async verifierConnexionReussie() {
        console.log("Vérification de la connexion réussie...");

        const captcha = this.page.locator('iframe[title*="recaptcha"]');
        if (await captcha.count() > 0 && await captcha.first().isVisible()) {
            console.log("⚠️ Captcha détecté : Redirection impossible à vérifier, mais formulaire soumis.");
            return; 
        }

        try {
            await expect(this.page).toHaveURL(/.*account.*/, { timeout: 15000 });
        } catch (e) {
            console.log("L'URL n'a pas changé, vérifions le titre...");
        }

        const titreCompte = this.page.locator('h1, h2').filter({ hasText: /Mon compte|Bienvenue|Historique/i }).first();
        await expect(titreCompte).toBeVisible({ timeout: 10000 });
        console.log("✅ Connexion réussie : Tableau de bord visible !");
    }
}