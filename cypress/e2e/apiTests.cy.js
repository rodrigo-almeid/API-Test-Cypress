import UserModel from './models/userModel';

describe('Teste de API com Cypress', () => {
    it('Deve criar um usuário usando a API', () => {
        const user = new UserModel('Rodrigo Almeida', 'Analista de Teste Senior');

        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                name: user.name,
                job: user.job
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            //Valida Statuscode 201
            expect(response.status).to.be.eq(201);
            //Valida o nome retornado no body
            expect(response.body).to.have.property('name', user.name);
            //Valida o job retornado no body
            expect(response.body).to.have.property('job', user.job);
            //Valida se tem todos os campos ("name", "job", "id", "createdAt") no body
            expect(response.body).to.have.all.keys("name", "job", "id", "createdAt");

        });
    });
});
