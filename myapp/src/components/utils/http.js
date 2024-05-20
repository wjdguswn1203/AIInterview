import axios from "axios";

function loginhandler(loginData) {
    axios.post(
        'https://myapp-72c20-default-rtdb.firebaseio.com/user.json', loginData);
}