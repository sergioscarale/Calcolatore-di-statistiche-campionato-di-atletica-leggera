const prompt = require("prompt-sync")();

const fs = require('fs');
let controlloc = 0;
let controllod = 0;

/**
 *@author  Sergio Scarale,Matteo De Bonis,Davide Cocomazzi,Biagio Piazza
*/

/**
 * Classe che crea l'oggetto partecipante
 * @class
 */
class Partecipante
{
    /**
     * 
     * @param {string} nome - Il nome del partecipante
     * @param {string} cognome - Il cognome del partecipante
     * @param {string} sesso - Il sesso del partecipante
     * @param {string} data - La data di nascita del partecipante
     * @param {string} nazionalita - La nazionalità del partecipante 
     */
    constructor(nome,cognome,sesso,data,nazionalita)
    {
        this.nome=nome;
        this.cognome=cognome;
        this.sesso=sesso;
        this.data=data;
        this.nazionalita=nazionalita;
    }
}

/**
 * Classe che rappresenta una gara.
 * @class
 */
class Gara
{
    constructor(tipo_gara,tempo,partecipante)
    {
        /**
     * Crea una gara.
     * @constructs Gara
     * @param {string} tipo_gara - Il tipo di gara.
     * @param {string} tempo - Il tempo impiegato per completare la gara.
     * @param {Partecipante} partecipante - Il partecipante alla gara.
     */
        this.tipo_gara=tipo_gara;
        this.tempo=tempo;
        this.partecipante=partecipante;
    }
}

/**
 * Registra i dati di un partecipante.
 * @function
 * @param {Map<string, Partecipante>} partecipante_map - La mappa dei partecipanti.
 * @description Registra un partecipante chiedendo all'utente i dettagli del partecipante e aggiungendo il partecipante alla mappa.
 */
function r_dati(partecipante_map)
{
    let chiave=prompt("Inserisci l'ID del partecipante: ");

    if(!partecipante_map.has(chiave))
    {
        let nome=prompt("Nome: ");
        let cognome=prompt("Cognome: ");
        let sesso=prompt("Sesso: ");
        let data=prompt("Data di nascita: ");
        let nazionalita=prompt("Nazionalità: ");
        let partecipante=new Partecipante(nome,cognome,sesso,data,nazionalita);
        partecipante_map.set(chiave,partecipante);
        console.log("\nPartecipante iscritto correttamente!\n");
    } 
    else
    {
        console.log("Partecipante già iscritto!\n");
    }
}

/**
 * Genera un tempo casuale per una gara.
 * @function
 * @returns {string} Il tempo generato per la gara.
 * @description Genera un tempo casuale per una gara tra 9.5 e 11 secondi.
 */
function casuale()
{
    let tempo=9.5+Math.random()*(11-9.5);
    return tempo.toFixed(2);
}

/**
 * Registra un partecipante per una gara di 100 metri.
 * @function
 * @param {Map<string, Gara>} gara_map - La mappa delle gare.
 * @param {Map<string, Partecipante>} partecipante_map - La mappa dei partecipanti.
 * @description Registra un partecipante per una gara di 100 metri se il partecipante esiste e non è già stato registrato per una gara.
 */
function cento(gara_map,partecipante_map)
{
    let scrivi;
    if(controlloc==0)
    {
        scrivi="100 metri\n";
        fs.appendFile('classifica.txt', scrivi, err => {
            if(err)
                {
                    console.log(err);
                    return;
                }   
        });
        controlloc++;
    }
    
    

    let chiave=prompt("Inserisci l'ID del partecipante: ");

    if (partecipante_map.has(chiave) && !gara_map.has(chiave))
    {
        let tempo=casuale();
        let partecipante=partecipante_map.get(chiave);
        let gara=new Gara("100 metri",tempo,partecipante);
        gara_map.set(chiave,gara); 
        
        
    } 
    else
    {
        console.log("Partecipante non presente o già registrato in una gara!\n");
    }
}

function duecento(gara_map,partecipante_map)
{
    let scrivi;
    if(controllod==0)
    {
        scrivi="200 metri\n";
        fs.appendFile('classifica.txt', scrivi, err => {
            if(err)
                {
                    console.log(err);
                    return;
                }   
        });
        controllod++;
    }
    
    let chiave=prompt("Inserisci l'ID del partecipante: ");

    if (partecipante_map.has(chiave) && !gara_map.has(chiave))
    {
        let tempo=casuale();
        let partecipante=partecipante_map.get(chiave);
        let gara=new Gara("200 metri",tempo,partecipante);
        gara_map.set(chiave,gara);
        
    } 
    else
    {
        console.log("Partecipante non presente o già registrato in una gara!\n");
    }
}

function r_gare(partecipante_map, gara_map)
{
    let scelta;
    do 
    {
        console.log("\nTIPO DI GARA\n");
        console.log("0 - Esci");
        console.log("1 - 100 metri");
        console.log("2 - 200 metri");
        scelta=parseInt(prompt(">> "));
        switch(scelta)
        {
            case 1: cento(gara_map, partecipante_map); break;
            case 2: duecento(gara_map, partecipante_map); break;
        }
        scelta=parseInt(prompt("\n1 - Continua inserimento\n2 - Esci inserimento \n>> "));
    }while(scelta!==2);
}

function classifica(partecipante_map,gara_map)
{
    console.log("\nCLASSIFICA\n");
    let classificaArray=[];

    partecipante_map.forEach((partecipante,chiave)=>
    {
        let tempo=0;
        if(gara_map.has(chiave))
        {
            let gara=gara_map.get(chiave);
            tempo+=parseFloat(gara.tempo);
        }
        classificaArray.push({ nome: partecipante.nome,cognome: partecipante.cognome,tempo: tempo });
    });

    classificaArray.sort((a,b)=>a.tempo-b.tempo);

    classificaArray.forEach((corridore,posizione)=>
    {
        scrivi=`${posizione + 1}. ${corridore.nome} ${corridore.cognome} - Tempo: ${corridore.tempo} secondi`;
        fs.appendFile('classifica.txt', scrivi+"\n", err => {
        if(err)
        {
            console.log(err);
            return;
        }   
    });
 });


    
}

function main()
{
    
    let scelta;
    let partecipante_map=new Map();
    let gara_map=new Map();
    console.log("Calcolatore di statistiche campionato di atletica leggera\n");
    do
    {
        console.log("VERSIONE 1 - Base");
        console.log("0 - Esci;");
        console.log("1 - Registrazione dei principali dati anagrafici dei giocatori;");
        console.log("2 - Registrazione delle singole gare e dei relativi partecipanti;");
        console.log("3 - Creazione ed aggiornamento della classifica di campionato.\n");
        scelta=parseInt(prompt(">> "));
        switch (scelta)
        {
            case 1: r_dati(partecipante_map); break;
            case 2: r_gare(partecipante_map, gara_map); break;
            case 3: classifica(partecipante_map, gara_map); break;
        }
    }while(scelta!==0);
}

main();