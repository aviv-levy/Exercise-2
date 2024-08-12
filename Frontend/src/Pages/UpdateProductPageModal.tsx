import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { useHandleChange } from "../Hooks/useHandleChange";
import { Product } from "../Interfaces/Product";
import { dateFormatEU } from "../Services/DateCorrection";
import { toast } from "react-toastify";
import { updateProduct } from "../Services/ApiService";
import CancelButton from "../Components/CancelButton";

interface Props {
    product: Product,
    setProduct: React.Dispatch<SetStateAction<Product>>,
    setIsEdit: Function
}

function UpdateProductPageModal({ product, setProduct, setIsEdit }: Props) {

    const [dateControl, setDateControl] = useState<string>()

    const handleChange = useHandleChange(setProduct);

    //Fix date correction time from default system
    useEffect(() => {
        const date = new Date(dateFormatEU(product.date));
        setProduct((prevState) => ({
            ...prevState,
            date: date,
        }));
        setDateControl(date.toISOString().split('T')[0]);
    }, [])



    async function handleUpdate(e: FormEvent) {
        e.preventDefault();

        //Api call to update Product, when update successfuly show notification of success 
        await updateProduct(product).then(() => {

            toast.success('Product updated');
            setIsEdit(false);
            location.reload();

        }).catch(() => {
            toast.error('Something went wrong')
            return;
        })


    }


    if (dateControl === undefined)
        return <div>Loading...</div>

    return (
        <>
            {/* Main modal */}
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header  */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Product
                            </h3>
                            <button onClick={() => setIsEdit(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body  */}
                        <form className="p-4 md:p-5">
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-4 group">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Product Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={product.name}
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
                                        value={product.type}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleChange}>

                                        <option value={0}>Select Type</option>
                                        <option value='Fruit'>Fruit</option>
                                        <option value='Vegetable'>Vegetable</option>
                                        <option value='Field'>Field</option>
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
                                        value={product.barcode}
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
                                        value={dateControl}
                                        placeholder="8+ Characters, 1 Capital and small letter, 1 special sign"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        onChange={(e) => {
                                            setDateControl(e.target.value);
                                            handleChange(e);
                                        }}
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
                                        value={product.description}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Description..."
                                        onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="w-auto cursor-pointer me-3 rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                onClick={handleUpdate}>
                                Update Product
                            </button>
                            <CancelButton handleClick={() => setIsEdit(false)} />
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}

export default UpdateProductPageModal;