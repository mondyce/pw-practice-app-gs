//import staff from the playwright library
import {test,expect } from  '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {

//Locator is a general method in playwright that you can use to find a web element on the web page.
//by tag name  //Click is an action method returning a promise (use Await for the promise)
await page.locator('input').click()

//by ID
page.locator('#inputEmail1')

//by Class value
page. locator('.shape-rectangle' )

//by attribute
page. locator(' [placeholder="Email"]')

//by Class value (full) as a web element attribute 
page. locator(' [class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

//combine different selectors(tags and attributes) *No spaces inbetween* 
page. locator('input[placeholder="Email"][nbinput]')

// by XPath (NOT RECOMMENDED)
page. locator('//*[@id="inputEmail1"]')

// by partial text match (Grid with text "Using the Grid")
page. locator(':text("Using")')

//by exact text match (Grid with text "Using the Grid")
page. locator(':text-is("Using the Grid")')

})

test('User facing locators', async ({page}) => {
    //getByRole specify the role of the web element and the text of the web element u're trying to interact with
    //Mimick actual user behaviour and considered the best practice whenever possible`
    //Preferred method of the locator
    await page.getByRole('textbox', {name: "Email"}).first().click();
    await page.getByRole('button', {name: "Sign in"}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()

}) 

test('locating child elements', async ({page}) => {
    //Avoid using Index and first(Order of the elements)) 
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()

}) 

test('locating parent elements', async ({page}) => {
    //getByRole specify the role of the web element and the text of the web element u're trying to interact with
    //Mimick actual user behaviour and considered the best practice whenever possible`
    //Preferred method of the locator
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click();

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox', {name: "Email"}).click();

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click();
})

test('Reusing the locators', async ({page}) => {
//Assign your locators to a constant to reduce code duplication
    const basicForm = page.locator('nb-card', {hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

   
})

test('Extracting values', async ({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText =await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //All text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")
   
    //input values
    const emailField = basicForm.getByRole('textbox',{name:'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})

test('Assertions', async ({page}) => {
const basicForm = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
//General Assertions
const value = 5
expect(value).toEqual(5)

const text = await basicForm.textContent()
expect(text).toEqual("Submit")

//Locator assertion can interact with the web elements and the methods of the locator assertion willl wait up to  wait 5 seconds for the element to be available 
expect(basicForm).toHaveText('Submit')

//Soft Assertions
await expect.soft(basicForm).toHaveText('Submit5')
await basicForm.click();
})















//Hooks

// test.describe.only('suite1', () => {
//     test.beforeEach(async({page}) => {
//         await page.getByText('Charts').click()
//     })

//     test('the first test', async ({page}) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('navigate to datepicker page', async ({page}) => {
//         await page.getByText('Datepicker').click()
//     })
// })

// test.describe('suite1', () => {
//     test.beforeEach(async({page}) => {
//         await page.getByText('Forms').click()
//     })

//     test('the first test1', async ({page}) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('navigate to datepicker page1', async ({page}) => {
//         await page.getByText('Datepicker').click()
//     })
// })
