import { Product } from "../Interfaces/Product";

interface Props {
    product: Product
}


function ProductItem({ product }: Props) {
    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.id}
            </th>
            <td className="px-6 py-4">
                {product.name}
            </td>
            <td className="px-6 py-4">
                {product.barcode}
            </td>
            <td className="px-6 py-4">
                {product.type}
            </td>
            <td className="px-6 py-4">
                {"04-05-1998"}
            </td>
            <td className="flex items-center px-6 py-4">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
            </td>
        </tr>

    );
}

export default ProductItem;