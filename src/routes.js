const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const Post = require('./models/Post');

routes.get('/', (req, res) => {
	return res.json({ success: 'Hello world' });
});

routes.get('/posts', async (req, res) => {
	const posts = await Post.find();
	return res.json({ success: 'Posts loaded successfully', posts });
});

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
	const { originalname: name, size, key, location: url = '' } = req.file;
	const post = await Post.create({
		name,
		size,
		key,
		url
	});

	return res.json({ success: 'Post created successfully.', post });
});

routes.delete('/posts/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);

	await post.remove();
	return res.json({ success: 'Post deleted successfully' });
});

module.exports = routes;
