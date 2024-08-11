import { FormEvent, useContext, useState } from 'react';
// import { isEmailValid, isPasswordValid } from '../Services/Validations';
import { login } from '../Services/ApiService';
import { setToken } from '../Auth/TokenManager';
// import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
// import LockIcon from '../assets/svgs/LockIcon';
// import PhoneSvg from '../assets/svgs/PhoneSVG';
// import EmailIcon from '../assets/svgs/EmailIcon';
import ConnectionLayout from '../Layouts/ConnectionLayout';
import SVGLayout from '../Layouts/SvgLayout';
import FormLayout from '../Layouts/FormLayout';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // const userContext = useContext(UserContext);

    function validate(): boolean {
        // if (isEmailValid(email)) {
        //     setError('מייל לא תקין!');
        //     return false;
        // }
        // if (isPasswordValid(password)) {
        //     setError('סיסמא חייבת להכיל לפחות 8 תווים, ולפחות אות אחת!');
        //     return false;
        // }

        // setError('');
        return true;
    }

    // async function handleLogin(e: FormEvent) {
    //     e.preventDefault();
    //     if (!validate()) {
    //         return;
    //     }
    //     await login({ email, password }).then((user) => {
    //         // setToken(user.token)
    //         // userContext?.setAdmin(user.isAdmin)
    //         // userContext?.setUserFirstName(user.firstName)
    //         // userContext?.setUserLastName(user.lastName)

    //         // userContext?.setShowIsLoggedIn(true);
    //         navigate('/dashboard');

    //     }).catch((err) => {

    //         if (err === 401) {
    //             setError('מייל או סיסמא אינם נכונים!');
    //             return;
    //         }
    //         else {
    //             setError('משהו לא תקין יש לפנות לתמיכה');
    //             return;
    //         }
    //     })
    // }


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

                    <span className="mt-15 inline-block">
                        {/* <PhoneSvg /> */}
                    </span>
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
                                    placeholder="Enter your username"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <span className="absolute right-4 top-4">
                                    {/* <EmailIcon /> */}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="6+ Characters, 1 Capital letter"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <span className="absolute right-4 top-4">
                                    {/* <LockIcon /> */}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">

                            <p>Don't have a user? <Link to='/register' className='text-blue-500 underline'>Register now</Link></p>

                        </div>

                        <div className="mb-5">
                            <button type="submit"  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">Sign In</button>
                        </div>

                        <div className='text-red-600 text-center'>{error}</div>
                    </form>
                </FormLayout>
            </ConnectionLayout>
        </>

    );
}

export default LoginPage;