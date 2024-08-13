import { FormEvent, useContext, useState } from 'react';
import { login } from '../Services/ApiService';
import { setToken } from '../Auth/TokenManager';
import { Link, useNavigate } from 'react-router-dom';
import ConnectionLayout from '../Layouts/ConnectionLayout';
import SVGLayout from '../Layouts/SvgLayout';
import FormLayout from '../Layouts/FormLayout';
import { LoginUser } from '../Interfaces/LoginUser';
import { getLoginErrorsValidation } from '../Services/Validations';
import { UserDetailsContext } from '../App';
import CustomizedTextInput from '../Components/CustomizedTextInput';

function LoginPage() {
    const [user, setUser] = useState<LoginUser>({} as LoginUser);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string>('');

    const navigate = useNavigate();

    const userContext = useContext(UserDetailsContext);

    //Handle Login click button
    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        //Login inputs validation
        const validationErrors = getLoginErrorsValidation(user);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        // api request to login with user cardentials
        await login(user).then((user) => {
            setToken(user.token)
            userContext?.setUser(user);

            navigate('/shop');

        }).catch((err) => {

            if (err === 401) {
                setGeneralError('Username or Password wrong!');
                return;
            }
            else {
                setGeneralError('Something went wrong');
                return;
            }
        })
    }

    return (

        <>
            <ConnectionLayout>
                <SVGLayout>
                    <Link className="mb-5.5 inline-block" to="/">
                        <img className="dark:hidden w-40" src="https://www.reshot.com/preview-assets/icons/XTEWZD84MN/shopping-cart-XTEWZD84MN.svg" alt="Logo" />
                    </Link>

                    <p className="2xl:px-20">
                        Your Way To Buy Great Food.
                    </p>
                </SVGLayout>

                <FormLayout>
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Sign In to Market
                    </h2>

                    <form>

                        <CustomizedTextInput
                            type="text"
                            label="Username"
                            name="username"
                            placeholder="Enter your username"
                            value={user.username ? user.username : ''}
                            errorText={errors.username}
                            setState={setUser} />

                        <CustomizedTextInput
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="8+ Characters, 1 Capital and small letter, 1 special sign"
                            value={user.password ? user.password : ''}
                            errorText={errors.password}
                            setState={setUser} />

                        <div className="mb-6">

                            <p>Don't have a user? <Link to='/register' className='text-blue-500 underline'>Register now</Link></p>

                        </div>

                        <div className="mb-5">
                            <button type="button"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                onClick={handleLogin}>
                                Sign In</button>
                        </div>

                        <div className='text-red-600 text-center'>{generalError}</div>
                    </form>
                </FormLayout>
            </ConnectionLayout>
        </>

    );
}

export default LoginPage;