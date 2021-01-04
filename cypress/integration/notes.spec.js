describe('Notes App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('has notes-form', () => {
    cy.get('form').should('have.class', 'notes-form');
  });

  it('form has title', () => {
    cy.get('form').find('input#title').should('exist');
  });

  it('form has a text input', () => {
    cy.get('form').find('textarea#text').should('exist');
  });

  it('form has a submit button', () => {
    cy.get('form').find('button').should('have.attr', 'type', 'submit');
  });

  it('has no notes on load', () => {
    cy.get('ul li').should('have.length', 0);
  });

  it('create notes', () => {
    createNote('Note Title', 'Note Description');
    cy.get('ul li').should($noteCard => {
      // should have found 1 element
      expect($noteCard).to.have.length(1);

      // should contain title
      expect($noteCard[0]).to.contain('Note Title');

      //should contain note text
      expect($noteCard[0]).to.contain('Note Description');
    });

    cy.get('form').within(() => {
      // should find empty values in the form
      cy.get('input').should('have.value', '');
      cy.get('textarea').should('have.value', '');
    });
    createNote('Note Title 2', 'Note Description 3');

    cy.get('ul li').should($noteCard => {
      // should have found 2 element
      expect($noteCard).to.have.length(2);

      // should contain title
      expect($noteCard[1]).to.contain('Note Title 2');

      //should contain note text
      expect($noteCard[1]).to.contain('Note Description 3');
    });
  });

  it('delete notes', () => {
    createNote('Note Title', 'Note Description');
    createNote('Note Title 2', 'Note Description 2');
    cy.get('[data-testid="delete-icon"]').first().click();

    cy.get('ul li').should($noteCard => {
      expect($noteCard).to.have.length(1);
      expect($noteCard[0]).to.contain('Note Title 2');
      expect($noteCard[0]).to.contain('Note Description 2');
    });
  });
});

function createNote(title, text) {
  cy.get('form').within(() => {
    cy.get('input').type(title);
    cy.get('textarea').type(text);
    cy.get('button').click();
  });
}
