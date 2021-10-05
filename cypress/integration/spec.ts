
describe("Assignment page test", () => {
before('Visit to Assignment page', () => {
  cy.clearLocalStorage();
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon?limit=*', { fixture: 'pokemon-details.json' }).as('pokemonList');

  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1', { fixture: 'pokemon-1.json' }).as('pokemon-1');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/2', { fixture: 'pokemon-1.json' }).as('pokemon-2');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/3', { fixture: 'pokemon-1.json' }).as('pokemon-3');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/4', { fixture: 'pokemon-1.json' }).as('pokemon-4');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/5', { fixture: 'pokemon-1.json' }).as('pokemon-5');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/6', { fixture: 'pokemon-1.json' }).as('pokemon-6');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/7', { fixture: 'pokemon-1.json' }).as('pokemon-7');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/8', { fixture: 'pokemon-1.json' }).as('pokemon-8');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/9', { fixture: 'pokemon-1.json' }).as('pokemon-9');
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/10', { fixture: 'pokemon-1.json' }).as('pokemon-10');


  cy.visit('/');
  cy.wait(['@pokemonList', '@pokemon-1', '@pokemon-2', '@pokemon-3', '@pokemon-4', '@pokemon-5', '@pokemon-6', 
  '@pokemon-7', '@pokemon-8', '@pokemon-9', '@pokemon-10'])

})
it('loads assignment page with inital 10 item', () => {
  cy.get('app-cards .card').should('have.length', 10)
});

it('Should be able to navigate to next page', () => {
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/11', { fixture: 'pokemon-1.json' }).as('pokemon-11');
  cy.get('.pagination-bottom .pagination-next').click();
  cy.wait(['@pokemon-11']);
  cy.get('app-cards .card').should('have.length', 1);
});

it('Should be able to navigate to previous page', () => {
  cy.get('.pagination-bottom .pagination-previous').click();

  cy.get('app-cards .card').should('have.length', 10);
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'blastoise');
});


it('Should be able to sort in descending by name', () => {
  cy.get('app-pagination #sort-by-name').click();
  cy.get('app-cards .card').should('have.length', 10);
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'wartortle');
});

it('Should be able to sort in ascending by height', () => {
  cy.get('app-pagination #sort-by-height').click();
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'wartortle');
});


it('Should be able to sort in descending by height', () => {
  cy.get('app-pagination #sort-by-height').click();
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'blastoise');
});

it('Should be able to sort in ascending by weight', () => {
  cy.get('app-pagination #sort-by-weight').click();
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'blastoise');
});

it('Should be able to sort in descending by weight', () => {
  cy.get('app-pagination #sort-by-weight').click();
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'wartortle');
});


it('Should be able to filter the list', () => {
  cy.get('app-pagination #filter').type("wartortle");
  cy.get('app-cards .card').first().find('.is-size-2').should('have.text', 'wartortle');
  cy.get('app-cards .card').should('have.length', 1);

  cy.get('app-pagination #filter').clear();
  cy.get('app-cards .card').should('have.length', 10);
});

it('Should be able to navigate to the pokemon details on click of label', () => {
  cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1', { fixture: 'pokemon-1.json' }).as('pokemon-10');

  cy.get('app-cards .card').first().find('.is-size-2').click();
  cy.wait(['@pokemon-10']);
  cy.get('.has-text-primary').should('have.text', 'bulbasaur');

});

})

