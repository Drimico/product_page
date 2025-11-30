import { useEffect, useState } from "react";
import { getAllProducts } from "../api/requests";
import type { PaginationParams, ProductsResponse } from "../api/types";
import CustomPagination from "../components/core/CustomPagination";

const Home = () => {
  const [products, setProducts] = useState<ProductsResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const params: PaginationParams = { limit: 10, offset: offset, page: currentPage };
    getAllProducts(params).then((response) => {
      console.log(response);
      setProducts(response);
    });
  }, [currentPage, offset]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CustomPagination
        currentPage={currentPage}
        setOffset={setOffset}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
