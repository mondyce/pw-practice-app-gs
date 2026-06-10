//import staff from the playwright library
import {test,expect } from  '@playwright/test'

test.beforeEach(async({page}) => {
    
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
   
})

test('Auto waiting', async({page}) => {

    const successButton = page.locator('.bg-success')
    //await successButton.click()

    // const text = await successButton.textContent()
    // await successButton.waitFor({state: "attached"})

    //commands such as all text contents that do not have auto waiting feature implemented.
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton). toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

    })

test.skip('alternative waits', async({page}) => {
const successButton = page.locator('.bg-success')

// wait for element
// await page.waitForSelector('.bg-success')

//_ wait for particlular response
// await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

//_ wait for network calls to be completed ('NOT RECOMMENDED')
await page.waitForLoadState('networkidle')

const text = await successButton.allTextContents()
expect(text).toContain('Data loaded with AJAX get request.')

})