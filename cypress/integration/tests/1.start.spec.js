describe("Knowledge Base Application", () => {
    beforeEach(() => {
        cy.fixture("users/second").as("tester");
        cy.fixture("models/board").as("board");
        cy.visit("/");
    });

    it("Shows a placeholder", () => {
        cy.get(".lead")
            .should("have.text", "Create board, invite your friends and share your household duties from today!");
    });

    it('Document should have UTF-8 charset', () => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('Title should be "tSharing"', () => {
        cy.title().should('include', 'tSharing')
    })
  });