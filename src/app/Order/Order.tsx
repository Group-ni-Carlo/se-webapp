import { FC, Fragment, useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MerchDataProps } from '../../props/MerchDataProps';
import { headers } from '../../utils/headers';

const Order: FC = () => {
  const [merchData, setMerchData] = useState<MerchDataProps | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerSize, setBuyerSize] = useState('');
  const { id } = useParams();
  const sizes = ['S', 'M', 'L', 'XL'];
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (buyerName.length < 1) {
      window.alert(`Name can't be empty!`);
      return;
    }

    if (buyerSize.length === 0) {
      window.alert('Select a size!');
    }

    if (!merchData) {
      window.alert('Merch not found!');
    }

    const merchId = merchData?.id;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/merch/order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ merchId, buyerName, buyerSize })
        }
      );

      if (res.ok) {
        console.log('Merch ordered!');
        navigate('/merch');
      } else {
        console.log('Merch order failed!');
      }
    } catch (err) {
      console.log('An error occured', err);
      window.alert('Error occured!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/merch/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMerchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      {!merchData ? (
        <div className="flex flex-row w-full gap-4 items-center justify-center">
          <span className="text-2xl text-feedback-error">Merch not found</span>
        </div>
      ) : (
        <form
          className="flex flex-col items-center justify-center mt-2 pb-4 lg:flex-row"
          method="post"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex flex-col items-center">
              <img
                src={merchData.imageSrc}
                alt="Preview"
                className="w-1/2 rounded-lg border border-secondary-100 lg:w-3/4"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col mt-6 flex-row">
              <label htmlFor="Item" className={'title text-xl'}>
                Item
              </label>
              <textarea
                className={
                  'w-96 h-12 bg-secondary-100 py-2 px-2 mt-2 text-shade-light rounded body'
                }
                value={merchData.title}
                readOnly
              />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="name" className={'title text-xl'}>
                Buyer Name
              </label>
              <textarea
                id="name"
                className={
                  'w-96 h-12 px-2 py-4 mt-2 text-shade-light bg-secondary-100 rounded resize-y overflow-visible body'
                }
                onChange={(e) => setBuyerName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-6">
              <label htmlFor="name" className={'title text-xl'}>
                Buyer Size
              </label>
              <select
                className="w-24 h-12 px-2 py-4 mt-2 text-shade-light bg-secondary-100 rounded resize-y overflow-visible body"
                value={buyerSize}
                onChange={(e) => setBuyerSize(e.target.value)}
              >
                {sizes.map((size, i) => (
                  <option key={i} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <button
              className={
                'mt-6 px-8 py-2 text-shade-light text-xl bg-secondary-700 rounded-lg hover:cursor-pointer title'
              }
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default Order;
