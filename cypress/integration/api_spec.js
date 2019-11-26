describe('GIVEN the ZoomCare API', () => {
  describe('WHEN a GET request is sent', () => {
    it('THEN a success response is retrieved', () => {
      cy.request('GET', '/')
        .then((response) => {
          expect(response.status).to.equal(200)
        });
    })
  })
})
