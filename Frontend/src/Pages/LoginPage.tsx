import { FormEvent, useContext, useState } from 'react';
import { login } from '../Services/ApiService';
import { setToken } from '../Auth/TokenManager';
import { Link, useNavigate } from 'react-router-dom';
import ConnectionLayout from '../Layouts/ConnectionLayout';
import SVGLayout from '../Layouts/SvgLayout';
import FormLayout from '../Layouts/FormLayout';
import { LoginUser } from '../Interfaces/LoginUser';
import { useHandleChange } from '../Hooks/useHandleChange';
import { isLoginValid } from '../Services/Validations';
import { UserDetailsContext } from '../App';

function LoginPage() {
    const [user, setUser] = useState<LoginUser>({} as LoginUser);
    const [error, setError] = useState<string>('');

    const handleChange = useHandleChange(setUser);

    const navigate = useNavigate();

    const userContext = useContext(UserDetailsContext);

    //Handle Login click button
    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        if (!isLoginValid(user)) {
            return;
        }
        // api request to login with user cardentials
        await login(user).then((user) => {
            setToken(user.token)
            userContext?.setUser(user);

            navigate('/shop');

        }).catch((err) => {

            if (err === 401) {
                setError('Username or Password wrong!');
                return;
            }
            else {
                setError('Something went wrong');
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
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="8+ Characters, 1 Capital and small letter, 1 special sign"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-6">

                            <p>Don't have a user? <Link to='/register' className='text-blue-500 underline'>Register now</Link></p>

                        </div>

                        <div className="mb-5">
                            <button type="button"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                onClick={handleLogin}>
                                Sign In</button>
                        </div>

                        <div className='text-red-600 text-center'>{error}</div>
                    </form>
                </FormLayout>
            </ConnectionLayout>
        </>

    );
}

export default LoginPage;