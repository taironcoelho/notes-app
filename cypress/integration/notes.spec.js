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
    cy.get('form').within(() => {
      cy.get('input').type('Note Title');
      cy.get('textarea').type('Note Description');
      cy.get('button').click();
    });

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

      //should be able to create a second note
      cy.get('input').type('Note Title 2');
      cy.get('textarea').type('Note Description 3');
      cy.get('button').click();
    });

    cy.get('ul li').should($noteCard => {
      // should have found 2 element
      expect($noteCard).to.have.length(2);

      // should contain title
      expect($noteCard[1]).to.contain('Note Title 2');

      //should contain note text
      expect($noteCard[1]).to.contain('Note Description 3');
    });
  });
});
