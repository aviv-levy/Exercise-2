import { Link, useNavigate } from "react-router-dom";
import ConnectionLayout from "../Layouts/ConnectionLayout";
import SVGLayout from "../Layouts/SvgLayout";
import FormLayout from "../Layouts/FormLayout";
import { FormEvent, useState } from "react";
import { useHandleChange } from "../Hooks/useHandleChange.ts";
import { addNewUser } from "../Services/ApiService.ts";
import { isRegistrationValid } from "../Services/Validations.ts";
import { RegisterationUser } from "../Interfaces/RegisterationUser.ts";

function RegisterPage() {

    const [user, setUser] = useState<RegisterationUser>({} as RegisterationUser);
    const [error, setError] = useState<string>('');

    const handleChange = useHandleChange(setUser);

    const navigate = useNavigate();

    //Handle Register button
    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (!isRegistrationValid(user))
            return;

        //api request
        await addNewUser(user).then(() => {
            //created React Alert
            navigate('/login');

        }).catch((err) => {
            if (err) {
                setError(err);
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
                        Register to Market
                    </h2>

                    <form>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-4 group">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    First Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="Enter your First Name"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Enter your Last Name"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

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
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Repeat Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="rePassword"
                                    placeholder="Repeat Password"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <button type="button"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                onClick={handleRegister}>
                                Register
                            </button>
                        </div>

                        <div className='text-red-600 text-center'>{error}</div>
                    </form>
                </FormLayout>
            </ConnectionLayout>
        </>
    );
}

export default RegisterPage;