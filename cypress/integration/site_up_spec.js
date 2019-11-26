describe('GIVEN the ZoomCare website', () => {
  describe('WHEN it is requested', () => {
    it('THEN it loads for the end-user', () => {
      cy.visit('/')
      cy.contains('ZOOM+Care')
    })
    it('AND the missing favicon is ignored', () => {
      cy.request('/favicon.ico')
        .then((response) => {
          expect(response.status).to.equal(204)
        });
    })
  })
})
