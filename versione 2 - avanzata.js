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
 * @description - Registra un partecipante chiedendo all'utente i dettagli del partecipante e aggiungendo il partecipante alla mappa.
 * @function
 * @param {Map} partecipante_map - La mappa dei partecipanti.
 */
function r_dati(partecipante_map)
{
    console.clear();
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
 * @description - Genera un tempo casuale per una gara tra 9.6 e 30 secondi.
 * @function
 * @returns {string} - Il tempo generato per la gara.
 */
function casuale()
{
    let tempo=9.6+Math.random()*(30-9.6);
    return tempo.toFixed(2);
}

/**
 * @description - Controlla la partecipazione di un utente a una gara e la registra se non è già iscritto.
 * @function
 * @param {string} tipo_gara - Il tipo di gara.
 * @param {Map} partecipante_map - Mappa dei partecipanti.
 * @param {Map} gara_map - Mappa delle gare.
 */
function controllo_gara(tipo_gara, partecipante_map, gara_map)
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

/**
 * @description - Questa funzione gestisce la registrazione delle gare per un tipo specificato. L'utente può inserire più gare dello stesso tipo fino a quando non decide di uscire.
 * @function
 * @param {Map} partecipante_map - Mappa dei partecipanti.
 * @param {Map} gara_map - Mappa delle gare.
 */
function r_gare(partecipante_map, gara_map)
{
    console.clear();
    let scelta, tipo_gara;
    console.log("\nGARA\n");

    /* CHIEDERE
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
    */
   
    tipo_gara=prompt("Inserisci il tipo di gara: ");
    do 
    {
        controllo_gara(tipo_gara, partecipante_map, gara_map);
        console.log("\n- si per continuare ad inserire;\n- no per uscire;\n");
        scelta=prompt(">> ");
    }while(scelta.toLowerCase()!=="no");
    stampaGara(gara_map);
}

/**
 * @description - Questa funzione stampa le informazioni relative alle gare presenti nella mappa delle gare.
 * @function
 * @param {Map} gara_map 
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
 * @description - Questa funzione calcola e stampa la classifica per ogni tipo di gara.
 * @function
 * @param {Map} gara_map 
 * @param {*} classificaPerTipo 
 */
function classifica(gara_map,classificaPerTipo)
{
    console.clear();
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
 * @description - Questa funzione calcola e stampa la media dei tempi per ogni tipo di gara.
 * @function
 * @param {Map} gara_map - Mappa delle gare.
 */
function calcoloMedia(gara_map)
{
    console.clear();
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

/**
 * @description - Questa funzione calcola e visualizza le statistiche dei partecipanti alle gare.
 * @function
 * @param {Map} gara_map 
 */
function visualizzaStatistiche(gara_map) 
{
    console.clear();
    const statistichePerPartecipante=new Map();

    // Ottengo le statistiche di ogni partecipante
    gara_map.forEach(gara=> 
    {
        const chiave=`${gara.partecipante.nome} ${gara.partecipante.cognome}`;
        if (!statistichePerPartecipante.has(chiave)) {
            statistichePerPartecipante.set(chiave, {
                vinte: 0,
                podio: 0,
                fuoriPodio: 0,
                totali: 0
            });
        }
    });

    // Calcola classifica per ogni tipo di gara e aggiorna statistiche
    const classificaPerTipo={};
    gara_map.forEach(gara => 
    {
        const tipoGara=gara.tipo_gara;
        if(!classificaPerTipo[tipoGara]) 
        {
            classificaPerTipo[tipoGara]=[];
        }
        classificaPerTipo[tipoGara].push(
        {
            partecipante: gara.partecipante,
            tempo: parseFloat(gara.tempo)
        });
    });

    Object.keys(classificaPerTipo).forEach(tipoGara=>
    {
        classificaPerTipo[tipoGara].sort((a,b)=>a.tempo-b.tempo);
        classificaPerTipo[tipoGara].forEach((persona,posizione)=> 
        {
            let chiave=`${persona.partecipante.nome} ${persona.partecipante.cognome}`;
            let stats=statistichePerPartecipante.get(chiave);
            stats.totali++;

            // Incrementa vinte e podio quando vince
            if(posizione===0) 
            {
                stats.vinte++;
                stats.podio++;
            }
            // Incrementa podio per le posizioni 2 e 3
            else if(posizione<=2) 
            {
                stats.podio++;
            } 
            // Incrementa fuoriPodio se non rientri tra le prime 3 posizioni
            else
            {
                stats.fuoriPodio++;
            }
            statistichePerPartecipante.set(chiave, stats);
        });
    });

    // Calcolo delle percentuali
    statistichePerPartecipante.forEach((stats,chiave)=> 
    {
        stats.percentualeVittorie=(stats.vinte/stats.totali)*100;
        stats.percentualePodi=(stats.podio/stats.totali)*100;
        stats.percentualeFuoriPodio=(stats.fuoriPodio/stats.totali)*100;
    });

    // Stampa delle statistiche
    console.log("\nSTATISTICHE DEI GIOCATORI\n");

    statistichePerPartecipante.forEach((stat, giocatore)=> 
    {
        console.log(`${giocatore}: `);
        console.log(`- Gare totali: ${stat.totali}`);
        console.log(`- Gare vinte: ${stat.vinte}, ${stat.percentualeVittorie.toFixed(2)}%`);
        console.log(`- Piazzamenti a podio: ${stat.podio}, ${stat.percentualePodi.toFixed(2)}%`);
        console.log(`- Piazzamenti fuori podio: ${stat.fuoriPodio}, ${stat.percentualeFuoriPodio.toFixed(2)}%`);
        console.log("");
    });
}


/**
 * @description - Funzione principale che gestisce il menu e l'esecuzione delle altre funzioni.
 * @function
 */
function main()
{
    console.clear();
    /**
     * @type {number} - Variabile per memorizzare la scelta dell'utente.
     */
    let scelta;

    /**
     * @type {Map} - Mappa dei partecipanti.
     */
    let partecipante_map=new Map();

    /**
     * @type {Map} - Mappa delle gare.
     */
    let gara_map=new Map();

    /**
     * @type {object} - Oggetto contenente le classifiche per tipo di gara.
     */
    let classificaPerTipo={};
    console.log("Calcolatore di statistiche campionato di atletica leggera\n");
    do
    {
        console.log("VERSIONE 2 - Avanzata");
        console.log("0 - Esci;");
        console.log("1 - Registrazione dei principali dati anagrafici dei giocatori;");
        console.log("2 - Registrazione delle singole gare e dei relativi partecipanti;");
        console.log("3 - Creazione ed aggiornamento della classifica di campionato;");
        console.log("4 - Il calcolo della media dei punteggi;");
        console.log("5 - La visualizzazione della percentuale di gare vinte, dei piazzamenti a podio e fuori dal podio di ogni giocatore.\n");
        scelta=parseInt(prompt(">> "));
        switch (scelta)
        {
            case 0: console.log("\n\nciap ciap"); break;
            case 1: r_dati(partecipante_map); break;
            case 2: r_gare(partecipante_map, gara_map); break;
            case 3: classifica(gara_map,classificaPerTipo); break;
            case 4: calcoloMedia(gara_map); break;
            case 5: visualizzaStatistiche(gara_map); break;
        }
    }while(scelta!==0);
}

main();