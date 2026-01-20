import { Given, When, Then, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
// Attention: vérifie si ton fichier s'appelle ProductPage.ts ou ProductsPage.ts dans ton dossier
import { ProductsPage } from '../pages/ProductPage'; 

setDefaultTimeout(30 * 1000);

let browser: Browser;
let page: Page;
let homePage: HomePage;
let productsPage: ProductsPage;

// --- GIVEN ---

Given('je suis sur la page d\'accueil et je navigue vers {string}', async function (menu: string) {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);

    await homePage.naviguer();
    if (menu === "Products") {
        await homePage.allerSurPageProduits();
    }
});

// --- WHEN ---

When('je recherche le produit {string}', async function (produit: string) {
    await productsPage.rechercherProduit(produit);
});

// CORRECTION ICI : Remplacement de "trouvé" par "visible" pour matcher le fichier .feature
When('j\'ajoute le premier produit visible au panier', async function () {
    await productsPage.ajouterPremierProduit();
});

// --- THEN ---

Then('je dois voir la modale de confirmation {string}', async function (message: string) {
    await productsPage.verifierModaleSucces();
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
});