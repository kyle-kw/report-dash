const fs = require('fs');
const puppeteer = require('puppeteer-extra')
const axios = require('axios')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


puppeteer.launch({ headless: true }).then(async browser => {

    const page = await browser.newPage()
    await page.setViewport({ width: 1600, height: 900 })

    // 全国
    await page.goto('全国网址')
    await page.waitForSelector('#username');

    // 超级鹰 验证码识别
    var data =  {
        'user': '账号',
        'pass': '密码',
        'softid':'软件id', 
        'codetype': '1902',  
        'file_base64': ''
    }

    var im_id;
    var pic_str;

    while(1){
        await page.focus('#username');
        await page.keyboard.type('账号', { delay: 100 });

        await page.focus('#password');
        await page.keyboard.type('密码', { delay: 100 });

        let clip = await page.evaluate(() => {
            let {
                x,
                y,
                width,
                height
            } = document.getElementById('verifyImg').getBoundingClientRect();
            return {
                x,
                y,
                width,
                height
            };
        });

        await  page.screenshot({
            path:'./yz.png',
            clip:clip 
        });

        // 读取验证码
        await page.waitForTimeout(1000)

        var bitmap = fs.readFileSync('./yz.png')
        var base64str = Buffer.from(bitmap, 'binary').toString('base64')
        data['file_base64'] = base64str

        var res  = await axios.post('http://upload.chaojiying.net/Upload/Processing.php', data)

        im_id = await res['data']['pic_id']
        pic_str = await res['data']['pic_str']

        await page.focus('#verifyCode')
        await page.keyboard.type(pic_str, { delay: 100 })

        await page.click('#loginForm > ul > li:nth-child(4) > input')
        await page.waitForNavigation()
        await page.waitForTimeout(1000)

        var user_id = await page.$("#username")
        var k = 0
        if(user_id && k<4){
            k++
            var data2 =  {
                'user': '账号',
                'pass': '密码',
                'softid':'软件id', 
                'id': im_id
            }
        
            await axios
              .post('http://upload.chaojiying.net/Upload/ReportError.php', data2)
            continue
        }else{
            break
        }
    }

    await page.waitForTimeout(3000)
    await page.waitForSelector("#iframe_workspace")
    const cookies = await page.cookies()
    var cookies_qg = {};
    for (const element of cookies) {
        cookies_qg[element["name"]] = element["value"]
    }
    console.log('全国cookies已获取')
    

    // 河南系统
    await page.goto('河南网址')

    while(1){
        await page.focus('#username');
        await page.keyboard.type('账号', { delay: 100 });

        await page.focus('#password');
        await page.keyboard.type('密码', { delay: 100 });

        let clip = await page.evaluate(() => {
            let {
                x,
                y,
                width,
                height
            } = document.getElementById('verifyImg').getBoundingClientRect();
            return {
                x,
                y,
                width,
                height
            };
        });

        await  page.screenshot({
            path:'./yz.png',
            clip:clip 
        });

        // 读取验证码
        await page.waitForTimeout(1000)

        var bitmap = fs.readFileSync('./yz.png')
        var base64str = Buffer.from(bitmap, 'binary').toString('base64')
        data['file_base64'] = base64str

        var res  = await axios.post('http://upload.chaojiying.net/Upload/Processing.php', data)

        im_id = await res['data']['pic_id']
        pic_str = await res['data']['pic_str']

        await page.focus('#verifyCode')
        await page.keyboard.type(pic_str, { delay: 100 })

        await page.click('#loginForm > ul > li:nth-child(5) > input:nth-child(2)')
        await page.waitForNavigation()
        await page.waitForTimeout(1000)

        var user_id = await page.$("#username")
        var k = 0
        if(user_id && k<4){
            k++
            var data2 =  {
                'user': '账号',
                'pass': '密码',
                'softid':'软件id', 
                'id': im_id
            }
        
            await axios
              .post('http://upload.chaojiying.net/Upload/ReportError.php', data2)
            continue
        }else{
            break
        }
    }

    await page.waitForTimeout(3000)
    await page.waitForSelector("#iframe_workspace")
    const cookies_h = await page.cookies()
    var cookies_hn = {};
    for (const element of cookies_h) {
        cookies_hn[element["name"]] = element["value"]
    }
    console.log('河南cookies已获取')
    

    // 发票
    await page.goto('发票网址')

    while(1){
        await page.focus('#username');
        await page.keyboard.type('账号', { delay: 100 });

        await page.focus('#password');
        await page.keyboard.type('密码', { delay: 100 });

        let clip = await page.evaluate(() => {
            let {
                x,
                y,
                width,
                height
            } = document.getElementById('verifyImg').getBoundingClientRect();
            return {
                x,
                y,
                width,
                height
            };
        });

        await  page.screenshot({
            path:'./yz.png',
            clip:clip 
        });

        // 读取验证码
        await page.waitForTimeout(1000)

        var bitmap = fs.readFileSync('./yz.png')
        var base64str = Buffer.from(bitmap, 'binary').toString('base64')
        data['file_base64'] = base64str

        var res  = await axios.post('http://upload.chaojiying.net/Upload/Processing.php', data)

        im_id = await res['data']['pic_id']
        pic_str = await res['data']['pic_str']

        await page.focus('#verifyCode')
        await page.keyboard.type(pic_str, { delay: 100 })

        await page.click('#loginForm > ul > li:nth-child(6) > input:nth-child(2)')
        await page.waitForNavigation()
        await page.waitForTimeout(1000)

        var user_id = await page.$("#username")
        var k = 0
        if(user_id && k<4){
            k++
            var data2 =  {
                'user': '账号',
                'pass': '密码',
                'softid':'软件id', 
                'id': im_id
            }
        
            await axios
              .post('http://upload.chaojiying.net/Upload/ReportError.php', data2)
            continue
        }else{
            break
        }
    }

    await page.waitForTimeout(3000)
    await page.waitForSelector("#iframe_workspace")
    const cookies_f = await page.cookies()
    var cookies_fp = {};
    for (const element of cookies_f) {
        cookies_fp[element["name"]] = element["value"]
    }
    console.log('发票cookies已获取')

    await browser.close()


    const data1 = JSON.stringify({"c_qg":cookies_qg,"c_fp":cookies_fp,"c_hn":cookies_hn});
    fs.writeFile('./cookies.json', data1, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

})
