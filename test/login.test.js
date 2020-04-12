const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

/**
 * Authentication Testing
 */
describe('Authentication', function() {
  // Set Default test wait time to 0 (Disabled). Starting up the browser will take some time.
  this.timeout(0);

  describe('login()', function() {

    const tests = [
      {
        scenario: "incorrect",
        credentials: ["c@h.com","badPassword"],
        expectedUrl: "http://localhost:8000/login"
      },
      {
        scenario: "correct",
        credentials: ["c@h.com","password"],
        expectedUrl: "http://localhost:8000/"
      }
    ];

    for(test of tests){
      it(`Log user in with ${test.scenario} credentials given`, (done)=>{
      
        async function manipulate() {
          return (new Promise( async function(resolve, reject) {
            let driver = await new Builder().forBrowser('chrome').build();
  
            async function login(){
              await driver.get('localhost:8000/login');
              await driver.findElement(By.name('email')).sendKeys(test.credentials[0]);
              return await driver.findElement(By.name('password')).sendKeys(test.credentials[1], Key.RETURN);
            }
  
            login().then(async ()=>{
              await driver.wait(until.urlIs(test.expectedUrl), 2000).then(()=>resolve(driver));        
            });
            
          }));
        }
  
        
        manipulate().then(async (driver)=>{
          assert.equal(await driver.getCurrentUrl(), test.expectedUrl);
          await driver.quit()
        }).then(done).catch(err=>done(err));
        
      });
    }
  });

  
});