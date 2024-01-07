import { FC, ChangeEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { headers } from '../../utils/headers';

const CreatePartnerLogo: FC = () => {
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

    if (!(title.length <= 60 && title.length >= 1)) {
      console.log('Title length must be between 1 and 60');
      alert('Title length must be between 1 and 60');
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
        className="flex flex-col items-center justify-center mt-40"
        method="post"
        onSubmit={handlePost}
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
          />
        </div>
        <button
          className={
            'mt-6 px-8 py-2 text-shade-light text-xl bg-secondary-700 rounded-lg hover:cursor-pointer title'
          }
          type="submit"
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default CreatePartnerLogo;
