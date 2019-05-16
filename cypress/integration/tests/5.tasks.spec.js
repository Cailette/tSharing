
describe("User all tasks tab", () => {
    before(() => {
      cy.fixture("users/tester").as("tester");
      cy.fixture("models/task").as("task");
      cy.fixture("models/task2").as("task2");
    });

    beforeEach(() => {
        cy.fixture("users/tester").as("tester");
        cy.fixture("models/task").as("task");
        cy.fixture("models/task2").as("task2");

        cy.visit("/login");
        cy
            .get('input[name="uEmail"]')
            .type("tester@testmail.com");
        cy
            .get('input[name="uPassword"]')
            .type("secret");

        cy.get("form").submit();

        cy.visit("/sharing/allTasks");
    });
    
    it("Should be able to add tasks", function() {
        cy
            .get('#tTitle')
            .type(this.task.title)
            .should("have.value", this.task.title);
        cy
            .get('#tComment')
            .type(this.task.comment)
            .should("have.value", this.task.comment);

        cy.get('#currentTopic').should("have.text", "13");
        cy.get('#currentComment').should("have.text", "15");

        cy.get('form').submit()
        cy.contains(this.task.title)
        cy.contains(this.task.comment)
    });
    
    it("Should be able to assign task", function() {
        cy.get('.idAssign').first().click();

        cy.get(".idAssign").should('not.exist')
        cy.get(".taskRow").should('exist')
    });
    
    it("Should be able to complete task", function() {
        cy.visit("/sharing/yourTasks");
        cy.get('.idComplete').first().click();
        cy.get(".taskRow").should('not.exist')
    });

    after(() => {
        cy.task('deleteTask');
    });
  });