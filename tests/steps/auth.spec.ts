import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let loginPage: LoginPage;

// --- GIVEN : SCÉNARIO INVALIDE (Sans SlowMo) ---
Given('je commence la connexion sur le site Parfums Collection Privée', async function () {
     if (!page) {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.naviguer();
     }
});

// --- GIVEN : SCÉNARIO VALIDE (Avec SlowMo pour passer inaperçu) ---
Given('je démarre le test de connexion valide', async function () {
    if (!page) {
        browser = await chromium.launch({ 
            headless: false,
            slowMo: 150 // On ralentit un peu pour faire humain
        });
        context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.naviguer();
    }
});

// --- WHEN : PARTAGÉ (Fonctionne pour les deux scénarios !) ---

When('je navigue vers la page de connexion', async function () {
    // Ici, "page" et "loginPage" existent forcément, peu importe le Given utilisé avant
    if (!loginPage) loginPage = new LoginPage(page);
    await loginPage.allerSurPageConnexion();
});

When('je tente de me connecter avec {string} et {string}', async function (email: string, mdp: string) {
    await loginPage.remplirFormulaire(email, mdp);
});

When('je saisis mes identifiants valides {string} et {string}', async function (email: string, mdp: string) {
    await loginPage.remplirFormulaire(email, mdp);
});

Then('je dois voir un message d\'erreur d\'authentification', async function () {
    await loginPage.verifierMessageErreur();
});

Then('je dois être redirigé vers mon tableau de bord client', async function () {
    await loginPage.verifierConnexionReussie();
});

AfterAll(async function () {
    if (browser) await browser.close();
});