import React, { ChangeEvent, Fragment, useState, useEffect } from 'react';
import { AnnouncementDataProps } from '../../props/announcements';
import { useParams, useNavigate } from 'react-router-dom';

const EditAnnouncements = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [announcementData, setAnnouncementData] =
    useState<AnnouncementDataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_CONNECTION}/announcements/${id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setAnnouncementData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (announcementData) {
      setTitle(announcementData.title);
      setCaption(announcementData.caption);
      setImageSrc(announcementData.imageSrc);
    }
  }, [announcementData]);

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

  const handleEditRequest = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    formData.append('title', title);
    formData.append('caption', caption);

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
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/edit/announcements/${id}`,
        {
          method: 'PUT',
          body: formData
        }
      );

      const formDataArray = Array.from(formData.entries());
      console.log(formDataArray);

      if (response.ok) {
        console.log('Announcement edited successfully!');
        alert('Announcement edited successfully!');
        navigate('/admin/announcements');
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
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/delete/announcements/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        console.log('Announcement deleted successfully.');
        alert('Announcement deleted successfully.');
        navigate('/admin/announcements');
      } else {
        console.log('Delete failed!');
        alert('Delete failed!');
        console.log('Status code:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
      }

      console.log('Announcement deleted successfully.');
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
          {imageSrc ? (
            <img src={imageSrc} alt="Preview" className="w-24 h-24" />
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
            value={title}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            className="border border-neutral-500 rounded-lg"
            onChange={handleCaptionChange}
            value={caption}
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
        <div>
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

export default EditAnnouncements;
