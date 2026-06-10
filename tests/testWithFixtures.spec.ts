import { test } from '../test-options'
import { PageManager } from '../page-obects/pageManager'
import {faker} from '@faker-js/faker'
//import { NavigationPage } from '../page-obects/navigationPage'
//import { FormLayoutsPage } from '../page-obects/formsLayoutsPage'
//import { DatepickerPage } from '../page-obects/datepickerPage'

//Removed to refactor code and utilise fixtures
// test.beforeEach(async({ page }) => {
//     await page.goto('/')
// })



test('parametrized methods',async ({pageManager}) => {
//instances of the page obect
 
  const randomFullName = faker.person.fullName() 
  const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com` 

         //Removed to refactor code and utilise fixtures
        // await pm.navigateTo().formLayoutsPage()
        await pageManager.onFormLayoutsPage().submitUsingTheGrigdFormWithCredentialsAndSelectOption('test@test.com','Welcome1','Option 1')
        await pageManager.onFormLayoutsPage().sumbitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
        
})
