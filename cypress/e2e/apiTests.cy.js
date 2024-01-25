import UserModel from './models/userModel';

describe('Teste de API com Cypress', () => {
    const user = new UserModel('Rodrigo Almeida', 'Analista de Teste Senior');
    it('CT01 - Deve criar um usuário usando a API', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            failOnStatusCode: false,
            body: {
                name: user.name,
                job: user.job
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
    it('CT02 - Deve criar um usuário sem o campo nome', () => {

        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            failOnStatusCode: false,
            body: {
                job: user.job
            }
        }).then((response) => {
            //Valida Statuscode 201
            expect(response.status).to.be.eq(201);
            //Valida o nome retornado no body
            expect(response.body).to.not.have.property('name');
            //Valida o job retornado no body
            expect(response.body).to.have.property('job', user.job);
            //Valida se tem todos os campos ("name", "job", "id", "createdAt") no body
            expect(response.body).to.have.all.keys("job", "id", "createdAt");

        });
    });
    it('CT03 - Deve criar um usuário sem o campo job', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            failOnStatusCode: false,
            body: {
                name: user.name
            }
        }).then((response) => {
            //Valida Statuscode 201
            expect(response.status).to.be.eq(201);
            //Valida o nome retornado no body
            expect(response.body).to.have.property('name', user.name);
            //Valida o job retornado no body
            expect(response.body).to.not.have.property('job');
            //Valida se tem todos os campos ("name", "job", "id", "createdAt") no body
            expect(response.body).to.have.all.keys("name", "id", "createdAt");

        });
    });
    it('CT04 - Deve criar um usuário id e createdAt e sem o campo nome e job', () => {
        const user = new UserModel('Rodrigo Almeida', 'Analista de Teste Senior');

        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            failOnStatusCode: false
        }).then((response) => {
            //Valida Statuscode 201
            expect(response.status).to.be.eq(201);
            //Valida se o campo nome nao esta retornando no response
            expect(response.body).to.not.have.property('name');
            //Valida se o campo job não esta retornando no response
            expect(response.body).to.not.have.property('job');
            //Valida se tem todos os campos ("id", "createdAt") no body
            expect(response.body).to.have.all.keys("id", "createdAt");

        });
    });
});
