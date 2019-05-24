describe("User account page", () => {
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

      cy.visit("/sharing/account");
    });
    
    it("Should be able to view account page", function() {
      cy.get('#boardName').should("have.text", this.board.name);
      cy.get('#userName').should("have.text", "Your name: " + this.tester.name);

      cy.contains('Your teammates:');
      cy.contains(this.user.name)

      cy.get('ul').contains('Edit account').should('have.attr', 'href', '/sharing/editaccount')
      cy.get('ul').contains('Delete account').should('have.attr', 'data-target', '#deleteAlert')

      cy.contains("Delete account");
      cy.contains("Are you sure you want to delete your account?")
    });
    
    
    it("Should be able to edit account", function() {
      cy.get('.dropdown-toggle').click();
      cy.get("#edit").click();
      cy.location("pathname").should("eq", "/sharing/editaccount");

      cy
        .get('input[name="uName"]')
        .type("2")
        .should("have.value", this.tester.name + "2");

      cy.get('form').submit()
      cy.location("pathname").should("eq", "/sharing/account");
      cy.contains(this.tester.name + "2")

      cy.get('.dropdown-toggle').click();
      cy.get("#edit").click();

      cy.get('input[name="uName"]').clear() 
      cy.get('form').submit()
      cy.contains('Username field can not be empty.');
      
      cy.get('input[name="uName"]').clear() 

      cy
        .get('input[name="uName"]')
        .type(this.tester.name)
        .should("have.value", this.tester.name);

        cy.get('form').submit()
        cy.location("pathname").should("eq", "/sharing/account");
        cy.contains(this.tester.name)
    });
    
    it("Should be able to delete account", function() {
      cy.get('.dropdown-toggle').click();
      cy.get("#delete").click();
      cy.get("#deleteAgree").click();
      cy.location("pathname").should("eq", "/");

    });

    after(() => {
      cy.task('deleteUser');
      cy.task('deleteBoard');
    });
  });