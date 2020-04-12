const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

/**
 * Authentication Testing
 */
describe('Authentication', function() {
  // Set Default test wait time to 0 (Disabled). Starting up the browser will take some time.
  this.timeout(0);

  describe('login()', function() {

    it('Log user in with correct credentials given', (done)=>{
      
      async function manipulate() {
        return (new Promise( async function(resolve, reject) {
          let driver = await new Builder().forBrowser('chrome').build();

          async function login(){
            await driver.get('localhost:8000/login');
            await driver.findElement(By.name('email')).sendKeys('c@h.com');
            return await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);
          }

          login().then(async ()=>{
            await driver.wait(until.urlIs("http://localhost:8000/"), 2000).then(()=>resolve(driver));        
          });
          
        }));
      }

      
      manipulate().then(async (driver)=>{
        assert.equal(await driver.getCurrentUrl(), "http://localhost:8000/");
        driver.quit();
      }).then(done).catch(err=>done(err));
      
    });
  });
});