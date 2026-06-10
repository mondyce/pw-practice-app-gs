import { test } from '@playwright/test'
import { PageManager } from '../page-obects/pageManager'
import {faker} from '@faker-js/faker'
//import { NavigationPage } from '../page-obects/navigationPage'
//import { FormLayoutsPage } from '../page-obects/formsLayoutsPage'
//import { DatepickerPage } from '../page-obects/datepickerPage'

test.beforeEach(async({ page }) => {
    await page.goto('/')
})

test('navigate to form page', async({ page }) => {
    const pm =new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()

})

test('parametrized methods',async ({page}) => {
//instances of the page obect
  const pm =new PageManager(page)
  const randomFullName = faker.person.fullName() 
  const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com` 

        //const navigateTo = new NavigationPage(page)
        //const onFormLayoutsPage = new FormLayoutsPage(page)
        //const onDatePickerPage = new DatepickerPage(page)

        await pm.navigateTo().formLayoutsPage()
        await pm.onFormLayoutsPage().submitUsingTheGrigdFormWithCredentialsAndSelectOption('test@test.com','Welcome1','Option 1')
        await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
        const buffer = await page.screenshot()
        console.log(buffer.toString('base64'))
        await pm.onFormLayoutsPage().sumbitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
        await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
        await pm.navigateTo().datepickerPage()
        await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(4)
        await pm.onDatepickerPage().selectDatePickerWithRangeFromToday(1,4)
})

test.only('testing with argos ci', async({ page }) => {
    const pm =new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()


})
