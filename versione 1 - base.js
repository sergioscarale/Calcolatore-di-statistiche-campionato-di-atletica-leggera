/*
Versione 1 - Base
- La registrazione dei principali dati anagrafici dei giocatori.
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

function r_dati(partecipante_set)
{
    let nome=prompt("Nome: ");
    let cognome=prompt("Cognome: ");
    let trovato=false;

    //confrontare nome e cognome (?) per vedere se il partecipante è già iscritto

    partecipante_set.forEach(partecipante=>
        {
            if(partecipante.nome===nome && partecipante.cognome===cognome)
            {
                trovato=true;
            }
        });

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

function r_gare()
{

}

function classifica()
{

}

function main()
{
    let scelta;
    let partecipante_set=new Set();
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
            case 1: r_dati(partecipante_set);       break;
            case 2: r_gare();       break;
            case 3: classifica();   break;
        }
    }while(scelta!==0);
}

main();