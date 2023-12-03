import React, { ChangeEvent, useState } from 'react';

const Announcements = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const isImageValidType = (fileName: string): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(fileName);
  };

  const imageSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile && isImageValidType(selectedFile.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        console.log(`Successfully uploaded ${result}`);
        setSelectedImage(result);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleHeaderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newHeader = event.target.value;
    if (newHeader.length <= 150) {
      setHeader(newHeader);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    if (newDescription.length <= 2200) {
      setDescription(newDescription);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Header:', header);
    console.log('Description:', description);
    console.log('Selected Image:', selectedImage);

    if (!selectedImage) {
      alert('Please upload at least one image before submitting.');
      return;
    }

    if (header.length === 0) {
      alert('Header must not be blank.');
      return;
    }

    if (header.length > 150) {
      alert('Header input exceeds the maximum allowed length.');
      return;
    }

    if (description.length > 2200) {
      alert('Description input exceeds the maximum allowed length.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', header);
      formData.append('caption', description);
      formData.append('image_file', selectedImage);
      formData.append('date_of_post', new Date().toISOString());

      console.log('FormData:', formData);

      const response = await fetch('http://localhost:3001/announcement/post', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        alert('Submission complete!');
      } else {
        console.error('Error submitting form:', response.statusText);
        alert('Something went wrong, please check again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong, please check again.');
    }
  };

  return (
    <div className="flex">
      <div className="w-1/12 bg-neutral-100 h-screen"></div>
      <form onSubmit={handleSubmit} className="flex flex-col mx-16 my-6 w-full">
        <div className="border border-neutral-100 rounded-lg flex p-48 items-center self-center">
          <input
            type="file"
            id="imageInput"
            accept=".jpeg, .jpg, .png, .gif"
            onChange={imageSelectedHandler}
            className="mx-auto hidden"
          />
          <label
            htmlFor="imageInput"
            className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Choose File
          </label>
        </div>
        <div className="flex">
          {selectedImage && (
            <img
              src={selectedImage}
              alt={`Selected ${selectedImage}`}
              className="w-64 bg-auto h-64"
            />
          )}
        </div>
        <h1>Header</h1>
        <input
          id="header"
          value={header}
          onChange={handleHeaderChange}
          type="text"
          placeholder="Write something eyecatching"
          className="border border-neutral-100 rounded-lg w-1/2"
        />
        <h1>Description</h1>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Share some more details"
          className="border border-neutral-100 rounded-lg h-24 w-full"
        />
        <div>
          <button type="submit" className="py-4 bg-neutral-100 mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Announcements;
