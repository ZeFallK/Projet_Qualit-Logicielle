import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { chromium, Page, Browser } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CollectionPage } from '../pages/CollectionPage';

let browser: Browser;
let page: Page;
let homePage: HomePage;
let collectionPage: CollectionPage;

Given('je commence la navigation sur le site', async function () {
    if (!page) {
        browser = await chromium.launch({ 
            headless: false,
            slowMo: 2000 
        });
        const context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
        collectionPage = new CollectionPage(page);
        await homePage.naviguer();
    }
});

When('je survole le menu {string}', async function (menu: string) {
    await homePage.ouvrirMenu();
});

// --- CORRECTION DES NOMS ICI ---

When('je clique sur le lien {string}', async function (categorie: string) {
    // On utilise les termes exacts du fichier .feature (Singulier et "Unisexe")
    if (categorie === 'Homme') {
        await homePage.cliquerSurHomme();
    } else if (categorie === 'Femme') {
        await homePage.cliquerSurFemme();
    } else if (categorie === 'Unisexe') {
        await homePage.cliquerSurUnisexe();
    }
});

Then('je dois voir la page de collection {string}', async function (titre: string) {
    await collectionPage.verifierTitre(titre);
});

Then('je dois voir des produits affichés', async function () {
    await collectionPage.verifierProduitsPresents();
});

AfterAll(async function () {
    if (browser) await browser.close();
});