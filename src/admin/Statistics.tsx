import { FC, Fragment, useState, useEffect } from 'react';

import MerchCardOrder from '../components/admin/merch/MerchCardOrder';
import { MerchDataOrderProps } from '../props/MerchDataOrderProps';
import { headers } from '../utils/headers';

const Statistics: FC = () => {
  const [items, setItems] = useState<MerchDataOrderProps[]>([]);
  const [revenue, setRevenue] = useState<number>(0);
  const [soldItems, setSoldItems] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);

  const options = new Map();
  options.set(1, 'Revenue (Ascending)');
  options.set(2, 'Revenue (Descending)');
  options.set(3, 'Sales (Ascending)');
  options.set(4, 'Sales (Descending)');

  const toggleOpen = () => setIsOpen(!isOpen);

  const onOptionClicked = (option: number) => () => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const getItems = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/stats/list/${selectedOption}`,
      {
        headers
      }
    );
    const merch = await res.json();
    console.log(selectedOption);
    setItems(merch);
  };

  useEffect(() => {
    getItems();
  }, [selectedOption]);

  useEffect(() => {
    const getRevenue = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/stats/revenue`,
        {
          headers
        }
      );
      const data = await res.json();
      setRevenue(data.revenue);
    };

    const getSales = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/stats/sales`,
        {
          headers
        }
      );
      const data = await res.json();
      setSoldItems(data.sales);
    };

    getItems();
    getRevenue();
    getSales();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center lg:items-start lg:pl-12 gap-4 border-t border-b py-2 border-solid border-secondary-700 flex-1 mt-4 ">
          <div className="flex flex-col items-center lg:items-start sm:gap-2 mb-4 ">
            <div className="text-xl title">Revenue</div>
            <div className="text-4xl body">PHP {revenue}</div>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-2">
            <div className="text-xl title">Sold Items</div>
            <div className="text-4xl body">{soldItems}</div>
          </div>
        </div>
        <div className="flex flex-col justify-start ml-8 z-20">
          <div className="relative inline-block text-left">
            <div>
              <button
                onClick={toggleOpen}
                className="px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-solid border-secondary-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {`Filter by: ${options.get(selectedOption)}`}
              </button>
            </div>

            {isOpen && (
              <ul className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <li>
                  <button
                    onClick={onOptionClicked(1)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Revenue (ASCENDING)
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOptionClicked(2)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Revenue (DESCENDING)
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOptionClicked(3)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sales (ASCENDING)
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOptionClicked(4)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Revenue (DESCENDING)
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col z-10 flex-1 lg:flex-row lg:justify-center items-center mt-4 gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <MerchCardOrder
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                revenue={item.revenue}
                sales={item.sales}
                imageSrc={item.imageSrc}
              />
            ))
          ) : (
            <div className="flex flex-row w-full w-full gap-4 border-y border-solid border-secondary-700 items-center justify-center mt-4 py-4 px-4">
              <span className="text-2xl text-feedback-error">
                No merch yet!
              </span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Statistics;
