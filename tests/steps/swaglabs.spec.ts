import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser, expect } from '@playwright/test';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

setDefaultTimeout(30 * 1000);

let browser: Browser;
let page: Page;
let homePage: HomePage;
let productPage: ProductPage;

// --- GIVEN ---

Given('je suis sur la page d\'accueil Intersport et j\'accepte les cookies', { timeout: 20000 }, async function () {
    // Lancement du navigateur (headless: false pour voir l'action)
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    
    // Instanciation des POM [cite: 131]
    homePage = new HomePage(page);
    productPage = new ProductPage(page);

    await homePage.naviguer();
    await homePage.accepterCookies();
});

// --- WHEN ---

When('je recherche le produit {string}', async function (nomProduit: string) {
    await homePage.rechercherProduit(nomProduit);
});

When('je clique sur le premier produit de la liste', async function () {
    await productPage.cliquerPremierResultat();
});

When('j\'ajoute le produit au panier', async function () {
    await productPage.ajouterAuPanier();
});

// --- THEN ---

Then('la modale de confirmation d\'ajout au panier doit être visible', async function () {
    await productPage.verifierModaleConfirmation();
});

// Nettoyage après le test
AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
});