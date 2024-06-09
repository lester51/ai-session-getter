const axios = require('axios');
const express = require('express');
const app = express();
const port = 3000;

app.set('json spaces', 4);

let randomStr = (length) => {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
                counter += 1;
        }
        return result;
}

app.get('/', (req, res) => {
    res.send("This API was made by HackMeSenpai.")
});

app.get('/session', async function(req, res) {
	try {
	    let {data:r} = await axios.get('https:/\/aichatonlineorg.erweima.ai/aichatonline/api/auth/getUniqueId?canvas=-1931945298');
        console.log(req.get('host'))
        res.json({
            uniqueId: r.data,
            convoId: randomStr(32)
        })
	} catch (e) {
		if (!e.response)
			res.send({
				error: e.message
			});
		else {
			res.send({
				error: `${e.response.status} ${e.response.statusText}`,
				data: e.response.data.message
			});
		}
	}
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
});

module.exports = app;
