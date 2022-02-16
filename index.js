const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3000

const website = 'https://iq.vntu.edu.ua/b04213/curriculum/c_sched4week_m.php?view=g&group_id=5648&f_id=206&s_id=10618'

try {
    axios(website).then(res => {
        const data = res.data;
        const $ = cheerio.load(data)

        let htmlData = []

            $(".day, .lesson", data).each(function () {
                const name = $(this).text().split('\n').map(i => i.replace(/\s+/g, '')).join(' ').split('  ')
                const day =  $(this).find('div')
                htmlData.push({
                    text: name.filter(i => i)
                })
            })

        app.get('/', (req, res) => res.json({htmlData}))
    })
} catch (err) {
    console.log(err, err.message)
}

app.listen(PORT , () => {
    console.log(`Server started on PORT: ${PORT}`)
})