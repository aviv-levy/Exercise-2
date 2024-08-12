import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import { Product } from "../Interfaces/Product";
import { getProducts } from "../Services/ApiService";
import ProductItem from "../Components/ProductItem";



function ShopPage() {

    const [products, setProducts] = useState<Array<Product>>([]);
    const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const getAllProducts = await getProducts()
                setProducts(getAllProducts);
                setFilteredProducts(getAllProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [])


    //Search Hook that search for product when user typing inside searchbar.
    useEffect(() => {
        const copyProducts = [...products];
        const filter = copyProducts.filter(product =>
            product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        search === '' ? setFilteredProducts(copyProducts) : setFilteredProducts(filter)
    }, [search])



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SearchBar
                placeholder="Search Products..."
                changeFunc={setSearch}
            />


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Barcode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredProducts?.map(product =>
                                <ProductItem key={product.id} product={product} />
                            )
                        }
                    </tbody>
                </table>
            </div>




        </>
    );
}

export default ShopPage;