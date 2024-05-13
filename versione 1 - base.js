/*
Versione 1 - Base
- La registrazione dei principali dati anagrafici dei giocatori.        👏
- La registrazione delle singole gare e dei relativi partecipanti.
- La creazione ed aggiornamento della classifica di campionato.
*/
const prompt=require("prompt-sync")();

class Partecipante
{
    constructor(nome,cognome,sesso,data,nazionalita)
    {
        this.nome=nome;
        this.cognome=cognome;
        this.sesso=sesso;
        this.data=data;
        this.nazionalita=nazionalita;
    }
}

class Gara
{
    constructor(tipo_gara,tempo,partecipante)
    {
        this.tipo_gara=tipo_gara;
        this.tempo=tempo;
        this.partecipante=partecipante;
    }
}

function controllo(partecipante_set,nome,cognome)
{
    let trovato=false;
    //confrontare nome e cognome (?) per vedere se il partecipante è già iscritto
    partecipante_set.forEach(partecipante=>
        {
            if(partecipante.nome===nome && partecipante.cognome===cognome)
            {
                trovato=true;
            }
        });
    return trovato;
}

function r_dati(partecipante_set)
{
    let nome=prompt("Nome: ");
    let cognome=prompt("Cognome: ");
    let trovato=controllo(partecipante_set,nome,cognome);

    if(!trovato)
    {
        let sesso=prompt("Sesso: ");
        let data=prompt("Data di nascita: ");
        let nazionalita=prompt("Nazionalità: ");
        let partecipante=new Partecipante(nome,cognome,sesso,data,nazionalita);
        partecipante_set.add(partecipante);
        console.log("\nPartecipante iscritto correttamente!\n");
    }
    else
    {
        console.log("Partecipante già iscritto!\n");
    }
}

function casuale()
{
    tempo=9.5+Math.random()*(11-9.5);
    return tempo;
}

function cento(gara_set,nome,cognome)
{
    let tempo=casuale();
    let partecipante=new Partecipante(nome,cognome);
    let gara=new Gara("100 metri",tempo,partecipante);
    gara_set.add(gara);
    stampaGara(gara);
}

function duecento(gara_set,nome,cognome)
{
    let tempo=casuale();
    let partecipante=new Partecipante(nome,cognome);
    let gara=new Gara("200 metri",tempo,partecipante);
    gara_set.add(gara);
    stampaGara(gara);
}

function stampaGara(gara)
 {
    console.log("Tipo di gara: ",gara.tipo_gara);
    console.log("Tempo: ",gara.tempo+" secondi");
    console.log("Partecipante: ",gara.partecipante.nome,gara.partecipante.cognome);
}

function r_gare(partecipante_set,gara_set)
{
    let scelta,trovato_partecipante,trovato_gara;
    do
    {
        console.log("Inserisci i partecipanti della gara");
        let nome=prompt("Nome: ");
        let cognome=prompt("Cognome: ");
        trovato_partecipante=controllo(partecipante_set,nome,cognome);
        for(let gara of gara_set)
        {
            if(gara.partecipante.nome===nome && gara.partecipante.cognome===cognome)
            {
                trovato_gara = true;
                break;
            }
        }
        if(trovato_partecipante===true && !trovato_gara)
        {
            console.log("\nTIPO DI GARA\n");
            console.log("0 - Esci");
            console.log("1 - 100 metri");
            console.log("2 - 200 metri");
            scelta=parseInt(prompt(">> "));
            switch(scelta)
            {
                case 1: cento(gara_set,nome,cognome);        break;
                case 2: duecento(gara_set,nome,cognome);     break;
            }
        }
        else
        {
            console.log("Partecipante non presente o già registrato in una gara!\n");
        }
        scelta=parseInt(prompt("\n1 - Continua inserimento\n2 - Esci inserimento \n>> "));
    }while(scelta!==2);
}

function classifica()
{
    //implementazione classifica
}

function main()
{
    let scelta;
    let partecipante_set=new Set();
    let gara_set=new Set();
    console.log("Calcolatore di statistiche campionato di atletica leggera\n");
    do
    {
        console.log("VERSIONE 1 - Base");
        console.log("0 - Esci;")
        console.log("1 - Registrazione dei principali dati anagrafici dei giocatori;");
        console.log("2 - Registrazione delle singole gare e dei relativi partecipanti;");
        console.log("3 - Creazione ed aggiornamento della classifica di campionato.\n");
        scelta=parseInt(prompt(">> "));
        switch(scelta)
        {
            case 1: r_dati(partecipante_set);               break;
            case 2: r_gare(partecipante_set,gara_set);      break;
            case 3: classifica();   break;
        }
    }while(scelta!==0);
}

main();