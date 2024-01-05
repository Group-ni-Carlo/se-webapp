import React, { ChangeEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { headers } from '../../utils/headers';

const CreatePartnerLogo = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogoFile(event.target.files[0]);
      setLogoSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlePost = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (logoFile) {
      formData.append('logo_file', logoFile);
    }
    formData.append('title', title);

    if (!logoFile) {
      console.log('Must upload one logo');
      alert('Must upload one logo');
      return;
    }

    if (!(title.length <= 50 && title.length >= 1)) {
      console.log('Title length must be between 1 and 50');
      alert('Title length must be between 1 and 50');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/partners/create`,
        {
          method: 'POST',
          body: formData,
          headers
        }
      );

      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);

      if (response.ok) {
        console.log('Partner logo created successfully!');
        alert('Partner logo created successfully!');
        navigate('/admin/partners');
      } else {
        console.log('Failed!');
        alert('Failed!');
        console.log('Status code:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
      }
    } catch (error) {
      console.log(`Encountered error: ${error}`);
      alert(`Encountered error: ${error}`);
    }
  };

  return (
    <Fragment>
      <form
        className="flex flex-col items-center justify-center"
        method="post"
        onSubmit={handlePost}
      >
        <div className="flex flex-col items-center">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Preview"
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            <div className="w-24 h-24 border border-neutral-100"></div>
          )}
          <label
            htmlFor="logo_file"
            className="px-4 py-2 bg-neutral-500 rounded-lg hover:cursor-pointer"
          >
            Upload Logo
          </label>
          <input
            accept="image/*"
            type="file"
            id="logo_file"
            className="hidden"
            onChange={handleLogoChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="border border-neutral-500 rounded-lg"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <button
            className="px-4 py-2 bg-neutral-500 rounded-lg hover:cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default CreatePartnerLogo;
