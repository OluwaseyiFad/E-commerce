import { Link } from "react-router-dom";
import { useGetOrdersByUserQuery } from "../../services/productApi";
import { setOrders } from "@/store/slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { OrderType } from "@/utils/types";
import ReactPaginate from "react-paginate";

const Orders: React.FC = () => {
  const { data: orders = [], isLoading, error } = useGetOrdersByUserQuery({});
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 10;

  // Dispatch the fetched orders to the Redux store
  useEffect(() => {
    dispatch(setOrders(orders));
  }, [orders, dispatch]);

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (isLoading)
    return (
      <div className="rounded-md border border-gray-300 bg-gray-100 p-4 text-gray-700 shadow-sm">
        Loading...
      </div>
    );

  if (error) {
    console.error("Error fetching order:", error);
    return (
      <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700 shadow-sm">
        <strong>No order found!</strong>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl p-4">
      <h2 className="mb-4 text-2xl font-semibold">Your Orders</h2>

      {/* Map paginated orders to display as list */}
      <ul className="divide-y divide-gray-200">
        {currentOrders.map((order: OrderType) => (
          <li key={order.id} className="flex items-center justify-between py-4">
            <div>
              <p className="text-lg font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-500">
                Placed on {order.placed_at}
              </p>
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="text-sm text-cyan-600 hover:underline"
            >
              View Summary →
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName="flex space-x-2 text-sm"
          pageClassName="border px-3 py-1 rounded hover:bg-gray-100"
          activeClassName="bg-cyan-600 text-white border-cyan-600"
          previousClassName="border px-3 py-1 rounded hover:bg-gray-100"
          nextClassName="border px-3 py-1 rounded hover:bg-gray-100"
          breakClassName="px-2 py-1"
          previousLabel="←"
          nextLabel="→"
        />
      </div>
    </div>
  );
};

export default Orders;
