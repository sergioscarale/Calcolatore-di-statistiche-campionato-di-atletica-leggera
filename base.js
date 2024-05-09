/*
Versione 1 - Base
- La registrazione dei principali dati anagrafici dei giocatori.
- La registrazione delle singole gare e dei relativi partecipanti.
- La creazione ed aggiornamento della classifica di campionato.
*/
const prompt=require("prompt-sync")();
player = new Set();

function r_dati(nome_partecipante)
{
    let partecipante={};

    partecipante[nome_partecipante]={};

    partecipante[nome_partecipante]["nome"]=nome_partecipante;
    partecipante[nome_partecipante]["cognome"]=prompt("Cognome >> ");
    partecipante[nome_partecipante]["sesso"]=prompt("Sesso >> ");
    partecipante[nome_partecipante]["data"]=prompt("Data di nascita **/**/**** >> ");

    player.add(partecipante[nome_partecipante]);
   
}

function r_gare()
{
    console.log(player);
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
            case 1: r_dati(prompt("Inserire il nome del partecipante: "));       break;
            case 2: r_gare();       break;
            case 3: classifica();   break;
        }
    }while(scelta!==0);
}

main();