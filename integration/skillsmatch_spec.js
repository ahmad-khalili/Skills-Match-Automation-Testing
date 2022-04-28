beforeEach(() => {
    const username = 'team9'
    const password = '1234'
    cy.visit('https://skillsmatch.mdx.ac.uk/en')
    cy.xpath('//input[@name="username"]').type(username)
    cy.xpath('//input[@name="password"]').type(password)
    cy.xpath('//*[@value="Login"]').click()
})
it('Test Update My Skills', () => {
    cy.xpath('//a[contains(.,"Profile")]').click()
    cy.xpath('//a[@test-data="UpdateMySkills"]').click()
    cy.xpath('//a[@test-data="StartUpdatingMySkills"]').click()
    cy.xpath('//input[@test-data="answer_6"][@name="2"]').click()
    cy.xpath('//input[@test-data="NextStep"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="3"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="4"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="5"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="6"]').click()
    cy.xpath('//fieldset[2]//child::input[contains(@value,"Next Step")]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="7"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="8"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="9"]').click()
    cy.xpath('//fieldset[3]//child::input[contains(@value,"Next Step")]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="10"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="11"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="12"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="13"]').click()
    cy.xpath('//fieldset[4]//child::input[contains(@value,"Next Step")]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="14"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="15"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="16"]').click()
    cy.xpath('//fieldset[5]//child::input[contains(@value,"Next Step")]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="17"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="18"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="19"]').click()
    cy.xpath('//fieldset[6]//child::input[contains(@value,"Next Step")]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="20"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="21"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="22"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="23"]').click()
    cy.xpath('//input[@test-data="answer_5"][@name="24"]').click()
    cy.xpath('//fieldset[7]//child::input[contains(@value,"Next Step")]').click()
    cy.xpath('//input[@test-data="answer_1"][@name="25"]').click()
    cy.xpath('//input[@test-data="answer_1"][@name="26"]').click()
    cy.xpath('//input[@test-data="answer_3"][@name="27"]').click()
    cy.xpath('//input[@test-data="Confirm"]').click()
    cy.xpath('//*[@test-data="area_1_Scor"]').should('contain', '16/16')
    cy.xpath('//*[@test-data="area_2_Scor"]').should('contain', '12/12')
    cy.xpath('//*[@test-data="area_3_Scor"]').should('contain', '16/16')
    cy.xpath('//*[@test-data="area_4_Scor"]').should('contain', '12/12')
    cy.xpath('//*[@test-data="area_5_Scor"]').should('contain', '12/12')
    cy.xpath('//*[@test-data="area_6_Scor"]').should('contain', '20/20')
    for (let i = 1; i < 6;i++){
        cy.xpath('//div[contains(@test-data,"area_' + i + '_myscore")]//child::label[contains(@test-data,"filledStar")]').should('have.length', 5)
    }
})
it('Test Normal Search',() => {
    
})
it('Test Search With All Keywords',() => {

})
it('Test Search With Case Sensitivity',() => {
    cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('software{enter}')
    cy.xpath('//a[@test-data="AdvancedOptions"]').click()
    cy.xpath('//input[@test-data="sort_by_user_reviews"]').click()
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.xpath('//div[@test-data="searchItem_1"]//child::div[@test-data="UserFeedback"]').children('.fill').then(element => {
        let currentRating = element.length
        cy.xpath('//div[@test-data="searchItem_2"]//child::div[@test-data="UserFeedback"]').children('.fill').its('length').should('be.lte', currentRating)
    })
})
it('Test Search With Sorting Enabled',() => {
  
})
it('Test Search With Translation',() => {
    cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('برمجيات{enter}')
    cy.xpath('//a[@test-data="AdvancedOptions"]').click()
    cy.xpath('//select[@test-data="translateInput"]').select('en')
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.xpath('//div[@id="search-result"]').children().each((element) => {
        cy.get(element, { timeout: 10000 }).find('span[test-data="MatchedKeywords"]').should('contain', 'software')
    })
})
