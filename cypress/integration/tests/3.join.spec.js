describe("Join board and create account", () => {
    beforeEach(() => {
        cy.fixture("users/second").as("tester");
        cy.fixture("models/board").as("board");
        cy.visit("/join");
    });
    
    it("Should be able to come back", function() {        
        cy.get("#back").click();
        cy.location("pathname").should("eq", "/start");
    });

    it("Should not be able to join with not matching user password", function() {
        cy
            .get('input[name="bName"]')
            .type(this.board.name)
            .should("have.value", this.board.name);
        cy
            .get('input[name="bPassword"]')
            .type(this.board.password)
            .should("have.value", this.board.password);
        
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
            .type(this.tester.password + "02")
            .should("have.value", this.tester.password + "02");
    
        cy.get("form").submit();
        cy.location("pathname").should("eq", "/join");
        cy.get('.alert').should('be.visible')
    });
    
    it("Should be able to join board and create user account", function() {    
        cy
            .get('input[name="bName"]')
            .type(this.board.name)
            .should("have.value", this.board.name);
        cy
            .get('input[name="bPassword"]')
            .type(this.board.password)
            .should("have.value", this.board.password);
            
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
        cy.location("pathname").should("eq", "/");
    });
});