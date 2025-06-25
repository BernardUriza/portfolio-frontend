describe('Dynamic About Banner', () => {
  it('updates banner after project click', () => {
    cy.intercept('POST', '/api/ai/message', { message: 'AI says hi' }).as('ai');

    cy.visit('/projects');
    cy.get('[data-cy=project-card]').first().click();
    cy.wait('@ai');
    cy.get('[data-cy=about-banner]').contains('AI says hi');
  });
});
