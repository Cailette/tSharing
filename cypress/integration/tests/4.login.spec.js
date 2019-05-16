describe("Login to user account", () => {
    beforeEach(() => {
      cy.fixture("users/tester").as("tester");
    });
    
    it("Should be able to login: tester", function() {
      cy.visit("/login");
      
      cy
        .get('input[name="uEmail"]')
        .type(this.tester.email)
        .should("have.value", this.tester.email);
      cy
        .get('input[name="uPassword"]')
        .type(this.tester.password)
        .should("have.value", this.tester.password);

      cy.get("form").submit();
      cy.location("pathname").should("eq", "/sharing/allTasks");
    });
  });