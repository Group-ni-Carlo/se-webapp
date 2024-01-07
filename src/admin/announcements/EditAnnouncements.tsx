import { FC, ChangeEvent, Fragment, useState, useEffect } from 'react';
import { AnnouncementDataProps } from '../../props/announcements';
import { useParams, useNavigate } from 'react-router-dom';

import { headers } from '../../utils/headers';

const EditAnnouncements: FC = () => {
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
          `${process.env.REACT_APP_BACKEND_CONNECTION}/announcements/${id}`,
          {
            headers
          }
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

  const handleCaptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/announcements/edit/${id}`,
        {
          method: 'PUT',
          body: formData,
          headers
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
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin/announcements/delete/${id}`,
        {
          method: 'DELETE',
          headers
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
        <div className="flex justify-center">
          <button
            className={
              'mt-6 px-8 py-2 text-shade-light text-xl bg-secondary-700 rounded-lg hover:cursor-pointer title'
            }
            type="submit"
          >
            Submit
          </button>
          <div
            className="px-4 py-2 bg-feedback-error rounded-lg hover:cursor-pointer"
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
