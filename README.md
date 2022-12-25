# Report
In this report, we've explained every required test case in its own section. The script from the test can be found in the "integration" directory. The video demo of the script can be found at the end of the report. Also the test cases for each test can be found in the "Test Cases" directory in a ".pdf" file format.
## Logging In Precondition
- Before starting each test case, we visited the website and logged in to our testing account to be able to access inner features.
```ruby
beforeEach(() => {
    const username = 'team9'
    const password = '1234'
    cy.visit('https://skillsmatch.mdx.ac.uk/en')
    cy.xpath('//input[@name="username"]').type(username)
    cy.xpath('//input[@name="password"]').type(password)
    cy.xpath('//*[@value="Login"]').click()
```
## Skills Updation Test
- To test the skills updation, we navigated cypress to the "Profile" page, then we clicked on the "Update My Skills" button. Then started selecting each question's answer using its "test-data" and "name" as its selectors (we could have used the "test-data" attribute of that page and selected the answer as its child, but this solution seemed faster and more understandable). For the first "Next Step" we used its "test-data" attribute, but for the rest of the areas' "Next Step" buttons, we used the index of the fieldset, which represents each area sector, as the parent and selected the "Next Step" with an attribute of "value=Next Step" as the child (so we could select the next button for each page). Then we submitted the answers using the "test-data" of the "Confirm" button. Finally, we checked each area's score (they should have full values), and using a for loop, we iterated through each div containing the rating for each area and checked to see if the number of the filled stars equals to 5 (which is a full rating).
```ruby
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
```
## Normal Searching Test
- We navigated to the "Search" page after logging in, then selected the searchbox using its "role" attribute (the other input field that had the "test-data=keywordInput" attribute was hidden so it couldn't be used) then entered a keyword. Then we checked the first search item's matched keywords' span to check wether that keyword exists in it. Finally we opened that course's page and checked the number of occurrences for that keyword (after the description) and throwed an error if that count doesn't match the actual needed count.
```ruby
it('Test Normal Search',() => {
    cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('software{enter}')
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.xpath('//div[@test-data="searchItem_1"]//child::span[@test-data="MatchedKeywords"]').should('contain', 'software')
    cy.visit('https://skillsmatch.mdx.ac.uk/en/course/5795?keywords=software')
    cy.xpath('//div[@class="container"]//child::div[9]').invoke('text').then(desc => {
        var count = (desc.match(/software/g) || []).length;
        if (count != 9){
            throw new Error("The actual count doesn't match the keyword count")
```
## Searching With All Keywords Test
- Instead of just searching for a single keyword, this time, we searched for two keywords while pressing enter after every word to register them as 2 seperate keywords.Then, We selected the advanced options using its "test-data" as a selector and checked the first option also using its "test-data" selector then clicked search. Finally, we checked for both of the keywords inside each of the course's "Matched Keywords" using "should" with "and" methods (to assert 2 contains).
```ruby
it('Test Search With All Keywords',() => {
    cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('hello{enter}')
    cy.xpath('//span[@role="textbox"]').type('hi{enter}')
    cy.xpath('//a[@test-data="AdvancedOptions"]').click()
    cy.xpath('//input[@test-data="match_all"]').click()
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.xpath('//div[@id="search-result"]').children().each((element) => {
        cy.get(element).find('span[test-data="MatchedKeywords"]').should('contain', 'hello').and('contain', 'hi')
```
## Searching With Case Sensitivity
- This test, we entered a keyword with an upper case first letter and then picked the "Case Sensitive" option from the advanced options using its "test-data" selector. Finally, we checked each course's "Matched Keywords" to see if it matched that keyword's first upper letter.
```ruby
cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('Hello{enter}')
    cy.xpath('//a[@test-data="AdvancedOptions"]').click()
    cy.xpath('//input[@test-data="case_sensitive"]').click()
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.xpath('//div[@id="search-result"]').children().each((element) => {
        cy.get(element).find('span[test-data="MatchedKeywords"]').should('contain', 'Hello')
```
## Searching With Sorting Enabled
- We checked the "Sort By User Reviews" option using its "test-data" selector, then selected the child (User Feedback) from first search item using their "test-data" selectors then only selected the stars that are filled using the "children" method along with the type of class (to get the count of only the filled stars) then saved the first item's rating to "currentRating". Finally we selected the second search item's user feedback (using the same concept as the first item) and checked from the length of its stars with assertion using the "its" and "should" methods while passing the first item's rating to the assertion method to check if its less than or equal to the previous rating.
```ruby
it('Test Search With Sorting Enabled',() => {
    cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('software{enter}')
    cy.xpath('//a[@test-data="AdvancedOptions"]').click()
    cy.xpath('//input[@test-data="sort_by_user_reviews"]').click()
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.wait(10000)
    cy.xpath('//div[@test-data="searchItem_1"]//child::div[@test-data="UserFeedback"]').children('.fill').then(element => {
        let currentRating = element.length
        cy.xpath('//div[@test-data="searchItem_2"]//child::div[@test-data="UserFeedback"]').children('.fill').its('length').should('be.lte', currentRating)
```
## Searching With English Translation
- In this test, we enter an Arabic keyword instead of an English one, then select the English option using the "select" method passing the "test-data" for the selection as a selector, and the option containing the value "en" inside of that selection element. Finally, we check each course's match keywords with English translation of the entered keyword
```ruby
it('Test Search With Translation',() => {
    cy.xpath('//a[contains(.,"Search")]').click()
    cy.xpath('//span[@role="textbox"]').type('أهلا{enter}')
    cy.xpath('//a[@test-data="AdvancedOptions"]').click()
    cy.xpath('//select[@test-data="translateInput"]').select('en')
    cy.xpath('//button[@test-data="searchButton"]').click()
    cy.wait(10000)
    cy.xpath('//div[@id="search-result"]').children().each((element) => {
        cy.get(element).find('span[test-data="MatchedKeywords"]').should('contain', 'hello')
```
## Script Demo 
https://user-images.githubusercontent.com/63163965/165837145-dc2ea0a8-e497-4435-a226-e18725e7976b.mp4
