import { FormEvent, useEffect, useState } from "react";
import { useHandleChange } from "../Hooks/useHandleChange";
import ConnectionLayout from "../Layouts/ConnectionLayout";
import FormLayout from "../Layouts/FormLayout";
import SVGLayout from "../Layouts/SvgLayout";
import { Product, ProductType } from "../Interfaces/Product";
import { addNewProduct } from "../Services/ApiService";

function NewProductPage() {

    const [product, setProduct] = useState<Product>({} as Product);
    const [error, setError] = useState<string>('');

    const handleChange = useHandleChange(setProduct);

    //Handle Add new button
    async function handleAddNew(e: FormEvent) {
        e.preventDefault();
        formateDate();
        console.log(product.date);


        await addNewProduct(product).then(() => {



        }).catch((err) => {

            if (err === 401) {
                setError('Username or Password wrong!');
                return;
            }
            else {
                // setError('Something went wrong');
                setError(err);
                return;
            }
        })


    }

    function formateDate() {
        const day = String(product.date.getDate()).padStart(2, '0');
        const month = String(product.date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const year = product.date.getFullYear();

        setProduct((prevState) => ({
            ...prevState,
            date: new Date(`${day}-${month}-${year}`),// "DD-MM-YYYY"
        }));
    }


    // Calculate the date 7 days ago
    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7);

        // Format the date as YYYY-MM-DD
        const formattedDate: string = date.toISOString().split('T')[0];

        // Set the default date value in the form state
        setProduct((prevState) => ({
            ...prevState,
            date: date,
        }));
    }, []);


    if (product.date == undefined)
        return <div>loading...</div>


    return (
        <ConnectionLayout>
            <FormLayout>
                <div className="flex- justify-center">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Add New Product
                    </h2>

                    <form>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-4 group">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Product Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter Product Name"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Select Type
                                </label>
                                <select
                                    name="type"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={handleChange}>

                                    <option value={0}>Select Type</option>
                                    <option value={ProductType.Fruit}>Fruit</option>
                                    <option value={ProductType.Vegetable}>Vegetable</option>
                                    <option value={ProductType.Field}>Field</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Barcode
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="barcode"
                                    placeholder="Enter Product Barcode"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="date"
                                    value={product.date.toISOString().split('T')[0]}
                                    placeholder="8+ Characters, 1 Capital and small letter, 1 special sign"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Description
                            </label>
                            <div className="relative">
                                <textarea
                                    rows={5}
                                    name="description"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Description..."
                                    onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className="mb-5">
                            <button type="button"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                onClick={handleAddNew}>
                                Add Product
                            </button>
                        </div>

                        <div className='text-red-600 text-center'>{error}</div>
                    </form>
                </div>
            </FormLayout >

            <SVGLayout>
                addd picture
            </SVGLayout>
        </ConnectionLayout >
    );
}

export default NewProductPage;