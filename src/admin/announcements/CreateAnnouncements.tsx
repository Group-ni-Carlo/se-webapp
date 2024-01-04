import React, { ChangeEvent, Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleCaptionChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/create/announcements`,
        {
          method: 'POST',
          body: formData
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
        className="flex flex-col items-center justify-center"
        method="post"
        onSubmit={handlePost}
      >
        <div className="flex flex-col items-center">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Preview"
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            <div className="w-24 h-24 border border-neutral-100"></div>
          )}
          <label
            htmlFor="image_file"
            className="px-4 py-2 bg-neutral-500 rounded-lg hover:cursor-pointer"
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="border border-neutral-500 rounded-lg"
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            className="border border-neutral-500 rounded-lg"
            onChange={handleCaptionChange}
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

export default CreateAnnouncements;
