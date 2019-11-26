describe('GIVEN the ZoomCare website', () => {
  describe('WHEN it is requested', () => {
    it('THEN it loads for the end-user', () => {
      cy.visit('/')
      cy.contains('ZOOM+Care')
    })
  })
})
