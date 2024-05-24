const prompt=require("prompt-sync")();

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
 * @description Genera un tempo casuale per una gara tra 9.6 e 30 secondi.
 */
function casuale()
{
    let tempo=9.6+Math.random()*(30-9.6);
    return tempo.toFixed(2);
}

function controllo_gara(tipo_gara, partecipante_map, gara_map, r2_set)
{
    let chiave=prompt("Inserisci l'ID del partecipante: ");
    if(partecipante_map.has(chiave))
    {
        let partecipante=partecipante_map.get(chiave);
        let iscritto=Array.from(gara_map.values()).some(gara=>gara.partecipante===partecipante && gara.tipo_gara===tipo_gara);
        if(!iscritto)
        {
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

function r_gare(partecipante_map, gara_map, r2_set)
{
    let scelta, tipo_gara;
    console.log("\nGARA\n");
    tipo_gara=prompt("Inserisci il tipo di gara: ");
    // Verifica se il tipo di gara è già stato registrato perchè if(!gara_map.has(tipo_gara)) non va
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

function calcoloMedia(gara_map)
{
    const mediaTipoGara={};
    gara_map.forEach(gara=>
                    {
                        const tipoGara=gara.tipo_gara;
                        if(!mediaTipoGara[tipoGara])
                        {
                            mediaTipoGara[tipoGara]=
                            {
                                sommaTempi: 0,
                                conteggioGare: 0
                            }
                        }
                        mediaTipoGara[tipoGara].sommaTempi+=parseFloat(gara.tempo);
                        mediaTipoGara[tipoGara].conteggioGare++;
                    })
    console.log("\nMEDIE TEMPI PER OGNI TIPO DI GARA\n");
    for(let tipoGara in mediaTipoGara)
    {
        let sommaTempi=mediaTipoGara[tipoGara].sommaTempi;
        let conteggioGare=mediaTipoGara[tipoGara].conteggioGare;
        let media=sommaTempi/conteggioGare;
        console.log(`${tipoGara}: ${media.toFixed(2)} secondi\n`);
    }
}

function main()
{
    console.clear();
    let scelta;
    let partecipante_map=new Map();
    let gara_map=new Map();
    let r2_set=new Set();
    let classificaPerTipo={};
    console.log("Calcolatore di statistiche campionato di atletica leggera\n");
    do
    {
        console.log("VERSIONE 2 - Avanzata");
        console.log("0 - Esci;");
        console.log("1 - Registrazione dei principali dati anagrafici dei giocatori;");
        console.log("2 - Registrazione delle singole gare e dei relativi partecipanti;");
        console.log("3 - Creazione ed aggiornamento della classifica di campionato.");
        console.log("4 - Il calcolo della media dei punteggi.\n");
        scelta=parseInt(prompt(">> "));
        switch (scelta)
        {
            case 0: console.log("\n\nciap ciap"); break;
            case 1: r_dati(partecipante_map); break;
            case 2: r_gare(partecipante_map, gara_map,r2_set); break;
            case 3: classifica(gara_map,classificaPerTipo); break;
            case 4: calcoloMedia(gara_map); break;
        }
    }while(scelta!==0);
}

main();