 describe('Reference form header', () => {
  it('renders default header text', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="main-title"]').should('exist')
    .should('have.text', 'GL REFERENCE FORM')
  });

  it('renders personal first name input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="p-fname-input"]').should('exist')
  });
  
  it('renders personal last name input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="p-lname-input"]').should('exist')
  });
  
  it('renders personal address input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="p-address-input"]').should('exist')
  });

  it('renders employer name input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="e-name-input"]').should('exist')
  }); 

  it('renders employer current employment checkbox/input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="e-current-emp-input"]').should('exist')
  });

  it('renders employer start date input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="e-sdate-input"]').should('exist')
  }); 

  it('renders employer end date input field', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="e-edate-input"]').should('exist')
  }); 

  it('renders form submit button', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="form-button"]').should('exist')
  }); 
})
 