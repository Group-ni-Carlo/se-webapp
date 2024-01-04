import React, { useState, Fragment, useEffect } from 'react';
import AdminNavBar from '../admin/AdminNavBar';

const Product: React.FC = () => {
  const [products, setProducts] = useState<
    {
      id: number;
      image: string;
      price: number;
      title: string;
      description: string;
      stock: number;
    }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: 0,
    title: '',
    description: '',
    stock: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    fetch('http://localhost:5000/products/getproduct')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === 'image') {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        setImageFile(input.files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(
        key as keyof typeof formData,
        formData[key as keyof typeof formData].toString()
      );
    });

    if (imageFile) {
      data.append('image', imageFile, imageFile.name);
    }

    const response = await fetch('http://localhost:5000/products/addproduct', {
      method: 'POST',
      body: data
    });

    const product = await response.json();
    setProducts([...products, product]);
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (id: number, updatedProduct: any) => {
    const response = await fetch(
      `http://localhost:5000/products/updateproduct/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      }
    );
    const data = await response.json();
    setProducts(
      products.map((product) => (product.id === id ? data : product))
    );
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/products/deleteproducts/${id}`, {
      method: 'DELETE'
    });
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <Fragment>
      <div>
        <AdminNavBar />
        {isAddModalOpen && (
          <div
            className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                e.stopPropagation();
                closeAddModal(e);
              }
            }}
          >
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <button onClick={closeAddModal} className="cursor-pointer">
                  X
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="image" className="block mb-2">
                  Image
                </label>
                <input
                  required
                  id="image"
                  type="file"
                  accept="image/*"
                  placeholder="Select an image..."
                  name="image"
                  onChange={handleChange}
                />
                <label htmlFor="title" className="block mb-2 mt-4">
                  Title
                </label>
                <div className="flex w-full">
                  <input
                    required
                    id="title"
                    type="text"
                    placeholder="Enter title..."
                    className="flex-grow"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="price" className="block mb-2 mt-4">
                  Price
                </label>
                <div className="flex w-full">
                  <input
                    required
                    id="price"
                    type="number"
                    placeholder="Enter price..."
                    className="flex-grow"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="description" className="block mb-2 mt-4">
                  Description
                </label>
                <div className="flex w-full">
                  <textarea
                    required
                    id="description"
                    placeholder="Enter description..."
                    className="flex-grow"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <label htmlFor="stock" className="block mb-2 mt-4">
                  Stock
                </label>
                <div className="flex w-full">
                  <input
                    required
                    type="number"
                    id="stock"
                    placeholder="Enter stock quantity..."
                    className="flex-grow mb-4"
                    name="stock"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded block w-full"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        )}
        <div>
          <button
            onClick={openAddModal}
            className="absolute mt-5 px-3 py-2 bg-primary-500 rounded-3xl w-auto right-8"
          >
            Add Product
          </button>
        </div>
        <div className="m-20">
          <div className="flex flex-wrap space-x-32">
            {products.map((product, index) => (
              <div key={index} className="w-64">
                <div className="w-full h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt=""
                  />
                </div>
                <div className="p-4">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>In Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
