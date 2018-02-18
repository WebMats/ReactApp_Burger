//axios is a npm package that makes it easy to send GET, POST etc. request to the web.
import axios from 'axios';

//axios.create allows us to set up a base url that will be used everywhere else as the implicit starting URL
const instance = axios.create({
	baseURL: 'https://my-react-burger-app-250fe.firebaseio.com/'
});

export default instance;