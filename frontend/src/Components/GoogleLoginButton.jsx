import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import dotenv, { process } from 'dotenv';
dotenv.config({ path: '../.env' });

const GoogleLoginButton = () => {
    const handleSuccess = async (response) => {
        const { tokenId } = response;
        console.log('Token ID: ', tokenId);
        try {
            const LoginResponse = await axios.post('http://localhost:5000/auth/google',
                { tokenId },
                { withCredentials: true })
                .then((resp) => {
                    console.log('Resp: ', resp);
                    console.log('Response:', LoginResponse);
                })
                .catch(err => {
                    console.log('Error: ', err);
                    console.log('Response: ', LoginResponse);
                });
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const handleFailure = (response) => {
        console.error('Login failed', response);
    };

    return (
        <GoogleLogin
            clientId={process.env.Client_ID}
            buttonText="Sign in with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;