import { Link, useNavigate } from "react-router-dom";
import ConnectionLayout from "../Layouts/ConnectionLayout";
import SVGLayout from "../Layouts/SvgLayout";
import FormLayout from "../Layouts/FormLayout";
import { FormEvent, useState } from "react";
import { addNewUser } from "../Services/ApiService.ts";
import { getRegistrationErrorsValidation } from "../Services/Validations.ts";
import { RegisterationUser } from "../Interfaces/RegisterationUser.ts";
import CustomizedTextInput from "../Components/CustomizedTextInput.tsx";

function RegisterPage() {

    const [user, setUser] = useState<RegisterationUser>({} as RegisterationUser);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string>('');

    const navigate = useNavigate();

    //Handle Register button
    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        //Register inputs validation
        const validationErrors = getRegistrationErrorsValidation(user);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        //api request to create new user
        await addNewUser(user).then(() => {

            navigate('/login');

        }).catch((err) => {
            if (err) {
                setGeneralError(err);
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

                            <CustomizedTextInput
                                type="text"
                                label="First Name"
                                name="firstname"
                                placeholder="Enter your First Name"
                                value={user.firstname ? user.firstname : ''}
                                errorText={errors.firstname}
                                setState={setUser} />

                            <CustomizedTextInput
                                type="text"
                                label="Last Name"
                                name="lastname"
                                placeholder="Enter your Last Name"
                                value={user.lastname ? user.lastname : ''}
                                errorText={errors.lastname}
                                setState={setUser} />
                        </div>

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

                        <CustomizedTextInput
                            type="password"
                            label="Repeat Password"
                            name="rePassword"
                            placeholder="Repeat Password"
                            value={user.rePassword ? user.rePassword : ''}
                            errorText={errors.rePassword}
                            setState={setUser} />

                        <div className="mb-5">
                            <button type="button"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                onClick={handleRegister}>
                                Register
                            </button>
                        </div>

                        <div className='text-red-600 text-center'>{generalError}</div>
                    </form>
                </FormLayout>
            </ConnectionLayout>
        </>
    );
}

export default RegisterPage;