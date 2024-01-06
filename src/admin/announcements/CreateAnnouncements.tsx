import React, { ChangeEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { headers } from '../../utils/headers';

const CreateAnnouncements = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCaptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(event.target.value);
  };

  const handlePost = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append('image_file', imageFile);
    }
    formData.append('title', title);
    formData.append('caption', caption);

    if (!imageFile) {
      console.log('Must upload one image');
      alert('Must upload one image');
      return;
    }

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

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/announcements/create`,
        {
          method: 'POST',
          body: formData,
          headers
        }
      );

      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);

      if (response.ok) {
        console.log('Announcement created successfully!');
        alert('Announcement created successfully!');
        navigate('/admin/announcements');
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
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              className="w-96 h-48 rounded-lg border border-secondary-100"
            />
          ) : (
            <div className="w-96 h-48 bg-secondary-300 flex justify-center items-center  rounded-lg">
              <label
                htmlFor="image_file"
                className={
                  'title text-xl hover:cursor-pointer text-shade-light'
                }
              >
                Upload Image
              </label>
            </div>
          )}
          <input
            accept="image/*"
            type="file"
            id="image_file"
            className="hidden"
            onChange={handleImageChange}
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
        <div className="flex flex-col mt-6">
          <label htmlFor="caption" className={'title text-xl'}>
            Caption
          </label>
          <textarea
            id="caption"
            className={
              'w-96 px-2 py-4 mt-2 text-shade-light bg-secondary-100 rounded resize-y overflow-visible body'
            }
            onChange={handleCaptionChange}
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

export default CreateAnnouncements;
