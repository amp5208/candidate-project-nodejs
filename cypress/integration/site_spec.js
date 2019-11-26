describe('GIVEN the ZoomCare website', () => {
  describe('WHEN browser requests preflight data', () => {
    it('THEN CORS are allowed from all origins', () => {
      cy.request('OPTIONS', '/')
        .then((response) => {
          expect(response.headers['content-type']).to.contain('text/plain; charset=utf-8');
          expect(response.headers['access-control-allow-origin']).to.equal('*');
          expect(response.headers['access-control-allow-headers'])
            .to.contain('Origin')
            .and.to.contain('X-Requested-With')
            .and.to.contain('Content-Type')
            .and.to.contain('Accept');
        });
    })
  })

  describe('WHEN it is requested', () => {
    it('THEN the UI loads for the end-user', () => {
      cy.visit('/')
      cy.contains('ZOOM+Care')
    })
    it('AND the missing favicon is ignored', () => {
      cy.request('GET', '/favicon.ico')
        .then((response) => {
          expect(response.status).to.equal(204);
        });
    })
  })
})
