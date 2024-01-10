import { FC, ChangeEvent, Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { headers } from '../../utils/headers';

import { PartnerDataProps } from '../../props/PartnerDataProps';

const EditPartnerLogo: FC = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState<PartnerDataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/partners/${id}`,
          {
            headers
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not good');
        }

        const data = await response.json();
        console.log(data);
        setPartnerData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (partnerData) {
      setLogoSrc(partnerData.logoSrc);
      setTitle(partnerData.title);
    }
  }, [partnerData]);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogoFile(event.target.files[0]);
      setLogoSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEditRequest = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (logoFile) {
      formData.append('logo_file', logoFile);
    }

    formData.append('title', title);

    if (!(title.length <= 60 && title.length >= 1)) {
      console.log('Title length must be between 1 and 60');
      alert('Title length must be between 1 and 60');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/partners/edit/${id}`,
        {
          method: 'PUT',
          body: formData,
          headers
        }
      );

      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);

      if (response.ok) {
        console.log('Partner logo updated successfully!');
        alert('Partner logo updated successfully!');
        navigate('/admin/partners');
      } else {
        console.log('Update Failed!');
        alert('Update Failed!');
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
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this partner logo?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/partners/delete/${id}`,
        {
          method: 'DELETE',
          headers
        }
      );

      if (response.ok) {
        console.log('Partner logo deleted successfully.');
        alert('Partner logo deleted successfully.');
        navigate('/admin/partners');
      } else {
        console.log('Delete failed!');
        alert('Delete failed!');
        console.log('Status code:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Fragment>
      <form
        className="flex flex-col items-center justify-center"
        method="post"
        onSubmit={handleEditRequest}
      >
        <div className="flex flex-col items-center">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Preview"
              className="w-96 h-48 rounded-lg border border-secondary-100"
            />
          ) : (
            <div className="w-96 h-48 bg-secondary-300 flex justify-center items-center  rounded-lg">
              <label
                htmlFor="logo_file"
                className={
                  'title text-xl hover:cursor-pointer text-shade-light'
                }
              >
                Upload Logo
              </label>
            </div>
          )}
          <input
            accept="image/*"
            type="file"
            id="logo_file"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="title" className={'title text-xl'}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={
              'w-96 py-2 px-2 mt-2 text-shade-light bg-secondary-100 rounded body'
            }
            onChange={handleTitleChange}
            value={title}
          />
        </div>
        <div className="flex justify-center">
          <button
            className={
              'mt-6 px-8 py-2 text-shade-light text-xl bg-secondary-700 rounded-lg hover:cursor-pointer title'
            }
            type="submit"
          >
            Update
          </button>
          <div
            className="px-4 py-2 bg-neutral-500 rounded-lg hover:cursor-pointer"
            onClick={handleDeleteRequest}
          >
            Delete
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default EditPartnerLogo;
