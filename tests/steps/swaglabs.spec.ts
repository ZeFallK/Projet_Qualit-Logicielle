import { Given, When, Then, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

// On laisse 60 secondes par étape car les sites réels peuvent être lents à charger
setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;
let homePage: HomePage;
let productPage: ProductPage;

// --- GIVEN ---

Given('je suis sur le site Parfums Collection Privée', async function () {
    browser = await chromium.launch({ headless: false });
    
    // On se fait passer pour un vrai utilisateur Chrome Windows
    context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    page = await context.newPage();
    
    homePage = new HomePage(page);
    productPage = new ProductPage(page);

    await homePage.naviguer();
});

// --- WHEN ---

When('je recherche le parfum {string}', async function (nomParfum: string) {
    await homePage.rechercher(nomParfum);
});

When('je clique sur le premier produit des résultats', async function () {
    await homePage.cliquerPremierResultat();
});

When('j\'ajoute le produit au panier', async function () {
    await productPage.ajouterAuPanier();
});

// --- THEN ---

Then('le panier doit s\'ouvrir avec le produit ajouté', async function () {
    await productPage.verifierPanier();
});

// --- NETTOYAGE ---

AfterAll(async function () {
    if (browser) await browser.close();
});