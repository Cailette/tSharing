describe("Statistics tab", () => {
    before(() => {
      cy.fixture("users/tester").as("tester");
      cy.fixture("users/second").as("user");
      cy.fixture("models/board").as("board");
    });

    beforeEach(() => {
      cy.fixture("users/tester").as("tester");
      cy.fixture("users/second").as("user");
      cy.fixture("models/board").as("board");

      cy.visit("/login");
      cy
        .get('input[name="uEmail"]')
        .type("tester@testmail.com");
      cy
        .get('input[name="uPassword"]')
        .type("secret");

      cy.get("form").submit();

      cy.visit("/sharing/statistics");
    });
    
    it("Should be able to view statistics page", function() {
        cy.contains('Board Statistics');
        cy.contains(this.user.name);
        cy.contains(this.tester.name);
        cy.contains('Users');
        cy.contains('Assigned');
        cy.contains('Completed');
        cy.contains('Deleted');
        cy.contains('Users Statistics');
    });

    after(() => {
      cy.task('deleteRate');
      cy.task('deleteTask');
      cy.task('deleteTask');
    });
  });