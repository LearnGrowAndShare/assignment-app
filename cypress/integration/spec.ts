it('loads examples', () => {
  cy.visit('/');
  cy.get('nav').contains('Pokemon');
});
