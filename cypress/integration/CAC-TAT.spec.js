
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){//executa o código antes de fazer qualquer outra coisa
        cy.visit('./src/index.html')//visita a url
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')//verifica o título da pagina
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Lorem ipsum donec sollicitudin malesuada faucibus quisque augue curabitur viverra suspendisse posuere, tincidunt cursus consequat duis semper hac nulla ligula viverra nisi. egestas justo sociosqu maecenas porttitor pellentesque adipiscing semper ac, massa facilisis et nibh netus quis enim pellentesque dui, proin quam ultrices rutrum felis quisque at justo, quisque ut eleifend interdum fermentum pellentesque litora. hac fringilla volutpat imperdiet magna ut massa augue habitasse magna, vivamus imperdiet tincidunt velit dui dolor ligula malesuada cubilia in, consectetur rhoncus orci at fames blandit sem pellentesque.';
        cy.get('#firstName').type('Karine')
        cy.get('#lastName').type('Lucion')
        cy.get('#email').type('karinelucion04@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Karine')
        cy.get('#lastName').type('Lucion')
        cy.get('#email').type('karinelucion04gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
        .type('e')
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Karine')
        cy.get('#lastName').type('Lucion')
        cy.get('#email').type('karinelucion04@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Karine').should('have.value','Karine')
        .clear('Karine').should('have.value','')
        cy.get('#lastName').type('Lucion').should('have.value','Lucion')
        .clear('Lucion').should('have.value','')
        cy.get('#email').type('karinelucion04@gmail.com').should('have.value','karinelucion04@gmail.com')
        .clear('karinelucion04@gmail.com').should('have.value','')
        cy.get('#phone').type('46991269158').should('have.value', '46991269158')
        .clear('46991269158').should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()//support>comands
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value=feedback]').check()
        .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')//ou #file-upload
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')//ou #file-upload
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})//simula o arrastar e soltar
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
   
  })