describe('GIVEN the ZoomCare website', function() {
  it('WHEN it is requested, THEN it loads for the end-user', function() {
    // expect(true).to.equal(true)
    cy.visit('/')
    cy.contains('ZOOM+Care')
  })
})
