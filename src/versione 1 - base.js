const prompt=require("prompt-sync")();

/**
 *@author  Sergio Scarale,Matteo De Bonis,Davide Cocomazzi,Biagio Piazza
*/

/**
 * @description - Classe che crea l'oggetto partecipante
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
        /** @type {string} */
        this.nome=nome;

        /** @type {string} */
        this.cognome=cognome;

        /** @type {string} */
        this.sesso=sesso;

        /** @type {string} */
        this.data=data;

        /** @type {string} */
        this.nazionalita=nazionalita;
    }
}

/**
 * @description - Classe che rappresenta una gara.
 * @class
 */
class Gara
{
    constructor(tipo_gara,tempo,partecipante)
    {
        /**
         * @description - Crea una gara.
         * @constructs Gara
         * @param {string} tempo - Il tempo impiegato per completare la gara.
         * @param {Partecipante} partecipante - Il partecipante alla gara.
         */

        /** @type {string} */
        this.tipo_gara=tipo_gara;

        /** @type {string} */
        this.tempo=tempo;

        /** @type {Partecipante} */
        this.partecipante=partecipante;
    }
}

/**
 * @description - Registra i dati di un partecipante.
 * @function
 * @param {Map<string, Partecipante>} partecipante_map - La mappa dei partecipanti.
 * @description Registra un partecipante chiedendo all'utente i dettagli del partecipante e aggiungendo il partecipante alla mappa.
 */
function r_dati(partecipante_map)
{

    console.clear();

    console.log(
        " _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ _____ \n" +
        "| __  |   __|   __|     |   __|_   _| __  |  _  |__   |     |     |   | |   __|\n" +
        "|    -|   __|  |  |-   -|__   | | | |    -|     |   __|-   -|  |  | | | |   __|\n" +
        "|__|__|_____|_____|_____|_____| |_| |__|__|__|__|_____|_____|_____|_|___|_____|\n"
    );

    let chiave=prompt("Inserisci l'ID del partecipante: ");

    if(!partecipante_map.has(chiave))
    {
        /** @type {string} */
        let nome=prompt("Nome: ");

        /** @type {string} */
        let cognome=prompt("Cognome: ");

        /** @type {string} */
        let sesso=prompt("Sesso: ");

        /** @type {string} */
        let data=prompt("Data di nascita: ");

        /** @type {string} */
        let nazionalita=prompt("Nazionalità: ");

        /** @type {Partecipante} */
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
 * @description Genera un tempo casuale per una gara tra 9.6 e 30 secondi.
 * @function
 * @returns {string} - Il tempo generato per la gara.
 */
function casuale()
{
    /** @type {number} */
    let tempo=9.6+Math.random()*(30-9.6);
    return tempo.toFixed(2);
}

/**
 * @description Funzione per controllare e registrare la partecipazione di un giocatore a una gara.
 * @function
 * @param {string} tipo_gara - Il tipo di gara 
 * @param {Map} partecipante_map - Mappa dei partecipanti con ID come chiave e oggetto partecipante come valore.
 * @param {Map} gara_map - Mappa delle gare con ID del partecipante e tipo di gara come chiave e oggetto gara come valore
 * @param {Set} r2_set 
 */
function controllo_gara(tipo_gara, partecipante_map, gara_map, r2_set)
{
    /** @type {string} */
    let chiave=prompt("Inserisci l'ID del partecipante: ");

    if(partecipante_map.has(chiave))
    {
        /** @type {Partecipante} */
        let partecipante=partecipante_map.get(chiave);

        /** @type {boolean} */
        let iscritto=Array.from(gara_map.values()).some(gara=>gara.partecipante===partecipante && gara.tipo_gara===tipo_gara);
        if(!iscritto)
        {
            /** @type {Gara} */
            let oggetto_gara=new Gara(tipo_gara,casuale(),partecipante);
            gara_map.set(chiave+"-"+tipo_gara,oggetto_gara);
        } 
        else
        {
            console.log("Il partecipante ha già partecipato a una gara di questo tipo.");
        }
    } 
    else 
    {
        console.log("Partecipante non presente!");
    }
}

/**
 * @description - Funzione per registrare le gare per un tipo di gara specifico.
 * @param {Map} partecipante_map - Mappa dei partecipanti con ID come chiave e oggetto partecipante come valore 
 * @param {Map} gara_map - Mappa delle gare con ID del partecipante e tipo di gara come chiave e oggetto gara come valore.
 * @param {Set} r2_set 
 * @returns 
 */
function r_gare(partecipante_map, gara_map, r2_set)
{
    /** @type {string} */
    let scelta;

    /** @type {string} */
    let tipo_gara;

    console.log("\nGARA\n");

    tipo_gara=prompt("Inserisci il tipo di gara: ");
    // Verifica se il tipo di gara è già stato registrato perchè if(!gara_map.has(tipo_gara)) non va

    /** @type {string[]} */
    let garaRegistrata=Array.from(gara_map.values()).map(gara=>gara.tipo_gara);
    
    if(!garaRegistrata.includes(tipo_gara))
    {
        do 
        {
            controllo_gara(tipo_gara, partecipante_map, gara_map, r2_set);
            console.log("\nsi per continuare ad inserire;\nno per uscire;\n");
            scelta=prompt(">> ");
        }while(scelta.toLowerCase()!=="no");
        stampaGara(gara_map);
    }
    else
    {
        console.log("Tipo di gara già inserito!");
        return;
    }
}

/**
 * @description - Funzione per stampare le gare registrate.
 * @param {Map} gara_map - Mappa delle gare con ID del partecipante e tipo di gara come chiave e oggetto gara come valore.
 */
function stampaGara(gara_map)
{
    console.log("Gara_map:");
    gara_map.forEach((gara, chiave) => {
        console.log(`ID Partecipante e Tipo di Gara: ${chiave}`);
        console.log(`Tipo di gara: ${gara.tipo_gara}`);
        console.log(`Tempo: ${gara.tempo}`);
        console.log(`Partecipante: ${gara.partecipante.nome} ${gara.partecipante.cognome}`);
    });
}

/**
 * @description - Funzione per creare e aggiornare la classifica delle gare.
 * @function
 * @param {Map} gara_map - Mappa delle gare con ID del partecipante e tipo di gara come chiave e oggetto gara come valore.
 * @param {Object} classificaPerTipo - Oggetto contenente le classifiche delle gare per tipo di gara.
 */
function classifica(gara_map,classificaPerTipo)
{
    console.log("\nCLASSIFICA\n");

    //Resetta l'oggetto classificaPerTipo per evitare duplicazioni
    Object.keys(classificaPerTipo).forEach(key=>delete classificaPerTipo[key]);

    gara_map.forEach((gara)=> 
    {
        const tipo_gara=gara.tipo_gara;
        if(!classificaPerTipo[tipo_gara])
        {
            classificaPerTipo[tipo_gara]=[];
        }
        classificaPerTipo[tipo_gara].push(
        {
            nome: gara.partecipante.nome,
            cognome: gara.partecipante.cognome,
            tempo: parseFloat(gara.tempo)
        });
    });

    for(const tipo_gara in classificaPerTipo)
    {
        console.log(`Classifica per: ${tipo_gara}`);
        classificaPerTipo[tipo_gara].sort((a, b) => a.tempo - b.tempo);
        classificaPerTipo[tipo_gara].forEach((corridore, posizione)=> 
        {
            console.log(`${posizione + 1}. ${corridore.nome} ${corridore.cognome} - Tempo: ${corridore.tempo} secondi`);
        });
        console.log("\n");
    }
}
/**
 * @description - Funzione principale che gestisce il flusso del programma.
 * @function
 * @param {let} scelta - Per decidere dove andrà il flusso.
 * @param {Map} partecipante_map - Mappa dei partecipanti con ID come chiave e oggetto partecipante come valore.
 * @param {Map} gara_map - Mappa delle gare con ID del partecipante e tipo di gara come chiave e oggetto gara come valore.
 * @param {Set} r2_set - 
 * @param {let} classificaPerTipo - Oggetto contenente le classifiche delle gare per tipo di gara.
 */
function main()
{
    console.clear();
    /** @type {string} */
    let scelta;

    /** @type {Map<string, Partecipante>} */
    let partecipante_map=new Map();

    /** @type {Map<string, Gara} */
    let gara_map=new Map();

    /** @type {Set<string>} */
    let r2_set=new Set();

    /** @type {Object.<string, {nome: string, cognome:string, tempo:numer}[]>} */
    let classificaPerTipo={};
    console.log("Calcolatore di statistiche campionato di atletica leggera\n");
    do
    {
        console.log(
            " _____ _____ _____ _____ _____ _____ _____ _____    ___            _____             \n" +
            "|  |  |   __| __  |   __|     |     |   | |   __|  |_  |    ___   | __  |___ ___ ___ \n" +
            "|  |  |   __|    -|__   |-   -|  |  | | | |   __|   _| |_  |___|  | __ -| .'|_ -| -_|\n" +
            " \\___/|_____|__|__|_____|_____|_____|_|___|_____|  |_____|        |_____|__,|___|___|\n"
        );                                                                         
        console.log("0 - Esci;");
        console.log("1 - Registrazione dei principali dati anagrafici dei giocatori;");
        console.log("2 - Registrazione delle singole gare e dei relativi partecipanti;");
        console.log("3 - Creazione ed aggiornamento della classifica di campionato.\n");
        scelta=parseInt(prompt(">> "));
        switch (scelta)
        {
            case 0: console.log("\n\nciap ciap"); break;
            case 1: r_dati(partecipante_map); break;
            case 2: r_gare(partecipante_map, gara_map,r2_set); break;
            case 3: classifica(gara_map,classificaPerTipo); break;
        }
    }while(scelta!==0);
}

//Avvia il programma principale
main();