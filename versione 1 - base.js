/*
Versione 1 - Base
- La registrazione dei principali dati anagrafici dei giocatori.
- La registrazione delle singole gare e dei relativi partecipanti.
- La creazione ed aggiornamento della classifica di campionato.
*/
const prompt=require("prompt-sync")();

function r_dati()
{
    let partecipante=
    {
        nome: prompt("Nome >> "),
        cognome: prompt("Cognome >> "),
        sesso: prompt("Sesso >> "),
        data: prompt("Data di nascita **/**/**** >> ")
    };
    
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
    console.log("Calcolatore di statistiche campionato di atletica leggera\n");
    do
    {
        console.log("VERSIONE 1 - Base");
        console.log("0 - Esci;")
        console.log("1 - Registrazione dei principali dati anagrafici dei giocatori;");
        console.log("2 - Registrazione delle singole gare e dei relativi partecipanti;");
        console.log("3 - Creazione ed aggiornamento della classifica di campionato.");
        scelta=parseInt(prompt(">> "));
        switch(scelta)
        {
            case 1: r_dati();       break;
            case 2: r_gare();       break;
            case 3: classifica();   break;
        }
    }while(scelta!==0);
}

main();