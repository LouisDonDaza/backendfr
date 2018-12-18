const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '4527822c8a064d07a13e3603cc2d7378'
});
const handleAPICall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.status(200).json(data);
	})
	.catch(err => res.status(400).json(undefined));
}

const handleImage = (db)=> (req, res) =>{
	const {id} = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries)
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleAPICall
}