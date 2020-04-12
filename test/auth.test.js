const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

var credentials = [];

/**
 * Authentication Testing -- Register User Functionality
 */
describe('Authentication', async function() {
  // Set Default test wait time to 0 (Disabled). Starting up the browser will take some time.
  this.timeout(0);

  await describe('register()', function() {

    // Generate random email (testXXXX@mail.com)
    let generateEmail = ()=>{
      return `test${String(Math.random()).replace("0.","").substr(1,4)}@mail.com`;
    }
    
    // Test Cases to loop through and set params.
    let tests = [
      {
        scenario: "incorrect password",
        credentials: ["invalid account", generateEmail(), "password", "badPassword"],
        expectedUrl: "http://localhost:8000/register"
      },
      {
        scenario: "incorrect email",
        credentials: ["invalid account", generateEmail().replace("@",""), "password", "password"],
        expectedUrl: "http://localhost:8000/register"
      },
      {
        scenario: "correct",
        credentials: ["valid account", generateEmail(), "password", "password"],
        expectedUrl: "http://localhost:8000/"
      }
    ];

    // Assign credentials to var for use in Login()
    credentials = tests[2].credentials;
  
    for(let i = 0; i < tests.length; i++){
      it(`Register user in with ${tests[i].scenario}`, (done)=>{
        
        /**
         * Carry out manipulation of page (input data) before testing against expected results.
         *
         * @returns last completed promise.
         */
        async function manipulate() {
          return (new Promise( async function(resolve, reject) {
            let driver = await new Builder().forBrowser('chrome').build();
  
            async function login(){
              await driver.get('localhost:8000/register');
              await driver.findElement(By.name('reg_name')).sendKeys(tests[i].credentials[0]);
              await driver.findElement(By.name('reg_email')).sendKeys(tests[i].credentials[1]);
              await driver.findElement(By.name('reg_password')).sendKeys(tests[i].credentials[2]);
              return await driver.findElement(By.name('reg_password_confirmation')).sendKeys(tests[i].credentials[3], Key.RETURN);
            }
            
            // Run manipulation and wait for page load.
            login().then(async ()=>{
              await driver.wait(until.urlIs(tests[i].expectedUrl), 2000).then(()=>resolve(driver)).catch(err=>done(err));        
            });
            
          }));
        }
  
        
        // Run testing agaist expected results.
        manipulate().then(async (driver)=>{
          // Check expected url.
          assert.equal(await driver.getCurrentUrl(), tests[i].expectedUrl);
          await driver.quit()
        }).then(done).catch(err=>done(err));
        
      });
    }
  });
});

/**
 * Authentication Testing -- Login Functionality
 */
describe('Authentication', async function() {
  // Set Default test wait time to 0 (Disabled). Starting up the browser will take some time.
  this.timeout(0);

  await describe('login()', function() {

    const tests = [
      {
        scenario: "incorrect credentials",
        credentials: [credentials[1],"badPassword"],
        expectedUrl: "http://localhost:8000/login"
      },
      {
        scenario: "correct credentials",
        credentials: [credentials[1],credentials[2]],
        expectedUrl: "http://localhost:8000/"
      }
    ];

    for(test of tests){
      it(`Log user in with ${test.scenario}`, (done)=>{
        
        /**
         * Carry out manipulation of page (input data) before testing against expected results.
         *
         * @returns last completed promise.
         */
        async function manipulate() {
          return (new Promise( async function(resolve, reject) {
            let driver = await new Builder().forBrowser('chrome').build();
  
            async function login(){
              await driver.get('localhost:8000/login');
              await driver.findElement(By.name('email')).sendKeys(test.credentials[0]);
              return await driver.findElement(By.name('password')).sendKeys(test.credentials[1], Key.RETURN);
            }
            
            // Run manipulation and wait for page load.
            login().then(async ()=>{
              await driver.wait(until.urlIs(test.expectedUrl), 2000).then(()=>resolve(driver));        
            });
            
          }));
        }
  
        // Run testing agaist expected results.
        manipulate().then(async (driver)=>{
          // Check expected url.
          assert.equal(await driver.getCurrentUrl(), test.expectedUrl);
          await driver.quit()
        }).then(done).catch(err=>done(err));
        
      });
    }
  });
});