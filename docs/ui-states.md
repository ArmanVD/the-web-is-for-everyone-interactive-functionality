# Interactive functionality

## UI states voor POST interactie

Over het ontwerpen en bouwen verschillende states van de UI-Stack.

### Aanpak

Als je een interactie ontwerpt moet je voor de gebruiker feedback ontwerpen. Je weet dat je met feedback en feedforward ervoor kan zorgen dat gebruikers weten wat ze moeten doen. Dit doe je o.a. met de juiste labels, teksten en button states.  

Als je een POST interactie ontwerpt moet je in de interface nog andere states ontwerpen. Het kan het zijn dat er nog geen data is, dat er data geladen wordt, of dat er iets fout gaat. Hiervoor kan je de UI-Stack gebruiken... Eerst ga je leren wat states en de UI-Stack zijn, daarna ga je de states ontwerpen en bouwen. 


## UI-Stack

Voor het ontwerpen van states met dynamische data gebruiken we de UI stack.  Scott Hurrf schrijft hierover:

> Every screen you interact with in a digital product has multiple personalities.
> 
> [How to fix a bad user interface](https://www.scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack/)


Voor elke scherm waar een gebruiker iets mee doet moet je verschillende states tonen. Er wordt bijvoorbeeld data geladen, of er kan iets mis gaan. Dan heeft de gebruiker feedback nodig die duidelijk maakt wat er gebeurt. Hiervoor heeft een scherm soms wel 5 states nodig. 

1. Loading State
2. Empty State
3. Partial State
4. Error State
5. Ideal state


![UI-stack](ui-stack.jpg) *verschillende states van dezelfde pagina.*



### Opdracht

Onderzoek met je tafel de 5 states van de UI-Stack:

👉 Schrijf de 5 UI-Stack states op het bord

👉 Zoek voor elke state een goed voorbeeld, heb je ook voorbeelden waar het niet goed gaat?

👉 Schrijf kort op waar ze voor gebruikt worden

👉 Bespreek met je tafel welke UI-stack states je kan gebruiken voor jouw `post` interactie



## UI-Stack ontwerpen en bouwen

Om de UI-Stack toe te passen ga je eerst de states ontwerpen zodat je precies weet wat je wil bouwen. Hiervoor ga je je wireflow uitbreiden. 

### Wireflow uitbreiden met de UI-Stack

Bespreek je wireflow met je buur en bedenk welke schermen de UI-Stack nodig hebben. Wat laat je bijvoorbeeld zien als er nog geen berichten zijn gepost? Wat zou er mis kunnen gaan met posten en wat voor feedback geef je dan aan de gebruiker? En wat ziet een gebruiker als het de POST goed gaat?

Voeg de states toe en geef ze een duidelijke titel. 


<!--
👉 Breid je wireflow uit met elke UI state
-->



### UI-Stack states bouwen in Liquid

Omdat we server-side pagina's aan het bouwen zijn gaan we beginnen met het bouwen van een empty-state en ideal-state. De loading-state gaan we in week 3 toevoegen als je de POST client-side gaat maken. 

Om de empty-state te kunnen tonen in Liquid zal je gebruik moeten maken van if/else statements. Welke HTMl ga je renderen als er geen data is? Welke HTML ga je renderen als er wel data is? 


👉 Schrijf bij de wireflows pseudo-code hoe je die state kan bouwen. Kijk in de liquid documentatie welke tags en filters je zou kunnen gebruiken om UI states te maken en schrijf ze op het bord

👉 Ga aan de slag en probeer de states te bouwen. Vrijdag gaan we de states testen en/of elkaar helpen met de volgende stap.

💪 Maak de UI states in [partials](https://shopify.github.io/liquid/tags/template/#render)



### Bronnen

- [Wireframing User Flow with Wireflows](https://balsamiq.com/learn/articles/wireflows/)
- [UI-Stack - How to fix a bad user interface](https://www.scotthurff.com/posts/why-your-user-interface-is-awkward-youre-ignoring-the-ui-stack/)
- [Shopify Liquid documentatie](https://shopify.github.io/liquid/)
- [Officiele Liquid documentatie](https://liquidjs.com/index.html)
