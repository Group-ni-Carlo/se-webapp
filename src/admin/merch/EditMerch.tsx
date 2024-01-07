import { FC, ChangeEvent, Fragment, useState, useEffect } from 'react';
import { MerchDataProps } from '../../props/MerchDataProps';
import { useParams, useNavigate } from 'react-router-dom';

import { headers } from '../../utils/headers';

const EditMerch: FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [price, setPrice] = useState('');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [merchData, setMerchData] = useState<MerchDataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/merch/${id}`,
          {
            headers
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setMerchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (merchData) {
      setTitle(merchData.title);
      setCaption(merchData.caption);
      setPrice(String(merchData.price));
      setImageSrc(merchData.imageSrc);
    }
  }, [merchData]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCaptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleEditRequest = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('price', price);

    if (!(title.length <= 50 && title.length >= 1)) {
      console.log('Title length must be between 1 and 50');
      alert('Title length must be between 1 and 50');
      return;
    }

    if (!(caption.length <= 2200)) {
      console.log('Caption length must be between 0 and 2200');
      alert('Caption length must be between 0 and 2200');
      return;
    }

    if (!(Number(price) > 0)) {
      console.log('Price must be a number above 0!');
      alert('Price must be a number above 0!');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/merch/edit/${id}`,
        {
          method: 'PUT',
          body: formData,
          headers
        }
      );

      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);

      if (response.ok) {
        console.log('Merch edited successfully!');
        alert('Merch edited successfully!');
        navigate('/admin/merch');
      } else {
        console.log('Edit failed!');
        alert('Edit failed!');
        console.log('Status code:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
      }
    } catch (error) {
      console.log(`Encountered error: ${error}`);
      alert(`Encountered error: ${error}`);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/merch/delete/${id}`,
        {
          method: 'DELETE',
          headers
        }
      );

      if (response.ok) {
        console.log('Merch deleted successfully.');
        alert('Merch deleted successfully.');
        navigate('/admin/merch');
      } else {
        console.log('Delete failed!');
        alert('Delete failed!');
        console.log('Status code:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
      }

      console.log('Merch deleted successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Fragment>
      <form
        className="flex flex-col items-center justify-center space-y-4"
        method="post"
        onSubmit={handleEditRequest}
      >
        <div className="flex flex-col items-center">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-full"
            />
          ) : (
            <div className="w-24 h-24 border border-gray-200"></div>
          )}
          <label
            htmlFor="image_file"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Upload Image
          </label>
          <input
            accept="image/*"
            type="file"
            id="image_file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="title" className="mb-2 text-lg font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border border-gray-300 rounded-lg w-full px-4 py-2"
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="caption" className="mb-2 text-lg font-semibold">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            className="border border-gray-300 rounded-lg w-full px-4 py-2"
            onChange={handleCaptionChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="price" className="mb-2 text-lg font-semibold">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="border border-gray-300 rounded-lg w-full px-4 py-2"
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div>
          <div
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
            onClick={handleDeleteRequest}
          >
            Delete
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default EditMerch;
