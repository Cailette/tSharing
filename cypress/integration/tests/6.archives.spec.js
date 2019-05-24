
describe("User all tasks tab", () => {
    before(() => {
        cy.fixture("users/tester").as("tester");
        cy.fixture("users/second").as("second");
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
            .type("second@testmail.com");
        cy
            .get('input[name="uPassword"]')
            .type("secret");

        cy.get("form").submit();

        cy.visit("/sharing/archiveTasks");
    });
    
    it("Should be able to view archive tasks", function() {
        cy.contains(this.task.title)
        cy.contains(this.task.comment)
        cy.contains(this.task2.title)
        cy.contains(this.task2.comment)
        cy.contains('.text-warning', this.tester.name)
        cy.contains('.text-primary', this.tester.name)
        cy.get('.rating')
    });
    
    // it("Should be able to rate task", function() {
    //     cy.get('.rating').select(4);
    //     cy.contains('div', '4.00')
    // });
    
    // it("Should be able to sort task", function() {
    //     cy.get('.labelDateDescending').first().check()
    //     cy.get('.taskRow').first().contains('h5', this.task2.comment)
    //     cy.get('.labelDateAscending').first().check()
    //     cy.get('.taskRow').first().contains('h5', this.task.comment)
    // });
    
    // it("Should be able to filter task", function() {
    //     cy.get('.labelCompleted').first().check();
    //     cy.get('.taskRow').first().contains('h5', this.task.comment)
    //     cy.get('.labelDeleted').first().check();
    //     cy.get('.taskRow').first().contains('h5', this.task2.comment)
    // });
  });