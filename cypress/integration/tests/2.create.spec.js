describe("Create board and user account", () => {
  beforeEach(() => {
      cy.fixture("users/tester").as("tester");
      cy.fixture("models/board").as("board");
      cy.visit("/create");
  });

  it("Should not be able to create board with not matching password", function() {
    cy
      .get('input[name="bName"]')
      .type(this.board.name)
      .should("have.value", this.board.name);
    cy
      .get('input[name="bPassword"]')
      .type(this.board.password)
      .should("have.value", this.board.password);
    cy
      .get('input[name="bPasswordMatch"]')
      .type(this.board.password + "02")
      .should("have.value",  this.board.password + "02");
      
    cy
      .get('input[name="uName"]')
      .type(this.tester.name)
      .should("have.value", this.tester.name);
    cy
      .get('input[name="uEmail"]')
      .type(this.tester.email)
      .should("have.value", this.tester.email);
    cy
      .get('input[name="uPassword"]')
      .type(this.tester.password)
      .should("have.value", this.tester.password);
    cy
      .get('input[name="uPasswordMatch"]')
      .type(this.tester.password)
      .should("have.value", this.tester.password);

    cy.get("form").submit();
    cy.location("pathname").should("eq", "/create");
    cy.get('.alert').should('be.visible')
  });
  
  it("Should not be able to create only user account", function() {      
    cy
      .get('input[name="uName"]')
      .type(this.tester.name)
      .should("have.value", this.tester.name);
    cy
      .get('input[name="uEmail"]')
      .type(this.tester.email)
      .should("have.value", this.tester.email);
    cy
      .get('input[name="uPassword"]')
      .type(this.tester.password)
      .should("have.value", this.tester.password);
    cy
      .get('input[name="uPasswordMatch"]')
      .type(this.tester.password)
      .should("have.value", this.tester.password);

    cy.get("form").submit();
    cy.location("pathname").should("eq", "/create");
    cy.get('.alert').should('be.visible')
  });
  
  it("Should be able to create board and user account", function() {
    cy.visit("/create");
    
    cy
      .get('input[name="bName"]')
      .type(this.board.name)
      .should("have.value", this.board.name);
    cy
      .get('input[name="bPassword"]')
      .type(this.board.password)
      .should("have.value", this.board.password);
    cy
      .get('input[name="bPasswordMatch"]')
      .type(this.board.password)
      .should("have.value",  this.board.password);
      
    cy
      .get('input[name="uName"]')
      .type(this.tester.name)
      .should("have.value", this.tester.name);
    cy
      .get('input[name="uEmail"]')
      .type(this.tester.email)
      .should("have.value", this.tester.email);
    cy
      .get('input[name="uPassword"]')
      .type(this.tester.password)
      .should("have.value", this.tester.password);
    cy
      .get('input[name="uPasswordMatch"]')
      .type(this.tester.password)
      .should("have.value", this.tester.password);

    cy.get("form").submit();
    cy.location("pathname").should("eq", "/invitation");
    
    cy.get("#skip").click();
    cy.location("pathname").should("eq", "/start");
  });
});