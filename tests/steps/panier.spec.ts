import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

let browser: Browser;
let page: Page;
let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;

Given('je prépare le test panier sur le site', async function () {
    browser = await chromium.launch({ headless: false, slowMo: 1000 });
    const context = await browser.newContext();
    page = await context.newPage();
    
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    
    await homePage.naviguer();
});

When('je lance la recherche pour {string}', async function (nom: string) {
    await homePage.rechercher(nom);
});

When('je choisis le premier résultat trouvé', async function () {
    await homePage.cliquerPremierResultat();
});

When('je valide l\'ajout au panier', async function () {
    await productPage.ajouterAuPanier();
    await productPage.verifierPanier();
});

When('je clique sur la poubelle pour supprimer', async function () {
    if (!cartPage) cartPage = new CartPage(page);
    await cartPage.supprimerArticle();
});

Then('le message {string} doit s\'afficher', async function (msg: string) {
    await cartPage.verifierPanierVide();
});

AfterAll(async function () {
    if (browser) await browser.close();
});