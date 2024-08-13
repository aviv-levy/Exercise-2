import { useContext, useState } from "react";
import { Product } from "../Interfaces/Product";
import { dateFormatCorrection } from "../Services/DateCorrection";
import { UserDetailsContext } from "../App";
import { deleteProduct } from "../Services/ApiService";
import { toast } from "react-toastify";

interface Props {
    product: Product,
    setIsEdit: Function,
    setEditProduct: Function,
    setDescriptionShow: Function
}



function ProductItem({ product, setIsEdit, setEditProduct, setDescriptionShow }: Props) {
    const [isRemoved, setIsRemoved] = useState<boolean>(false);
    const userContext = useContext(UserDetailsContext);

    //Handle edit button
    //When clicked set product of needed to be update.
    //And set true isEdit to show modal of update form.
    function handleEdit() {
        setEditProduct(product);
        setIsEdit(true);
    }

    //Handle edit button
    //When clicked set product to get details
    //And set true isDescription to show modal of description item.
    function handleProductClick() {
        setEditProduct(product);
        setDescriptionShow(true);
    }

    //Handle remove button
    async function handleRemove() {
        //api request to delete product
        await deleteProduct(product.id)
            .then(() => {
                setIsRemoved(true)
                toast.success('Product removed')
            }).catch((err) => { if (err) return; })
    }

    return (
        <>
            {
                !isRemoved &&
                <tr className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th onClick={handleProductClick} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.id}
                    </th>
                    <td onClick={handleProductClick} className="px-6 py-4">
                        {product.name}
                    </td>
                    <td onClick={handleProductClick} className="px-6 py-4">
                        {product.barcode}
                    </td>
                    <td onClick={handleProductClick} className="px-6 py-4">
                        {product.type}
                    </td>
                    <td onClick={handleProductClick} className="px-6 py-4">
                        {dateFormatCorrection(product.date)}
                    </td>

                    <td className="flex items-center px-6 py-4">
                        {Boolean(userContext?.user.isEditor) && // if user is editor show editor buttons
                            <>
                                <button onClick={handleEdit} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                <button onClick={handleRemove} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                            </>
                        }
                    </td>
                </tr>
            }

        </>
    );
}

export default ProductItem;