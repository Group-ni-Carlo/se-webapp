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
  const [showModal, setShowModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: 0,
    title: '',
    description: '',
    stock: 0
  });
  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
          <div className="grid grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div key={index} className="w-64">
                <div
                  className="flex flex-col items-center justify-center"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                >
                  <div className="w-64 h-48">
                    <img
                      className="object-cover w-full h-full"
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt=""
                    />
                  </div>
                  <h2
                    className="font cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                  >
                    {product.title}
                  </h2>
                </div>

                {activeProductId === product.id && (
                  <div className="mt-4">
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>In Stock: {product.stock}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {selectedProduct && showModal && (
          <Modal
            onClose={() => {
              setSelectedProduct(null);
              setShowModal(false);
            }}
            product={selectedProduct}
          />
        )}
      </div>
    </Fragment>
  );
};

interface ProductProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
  stock: number;
}

interface ModalProps {
  product: ProductProps;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ product, onClose }) => {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {product.title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-sm text-gray-500">
                    Price: ${product.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    In Stock: {product.stock}
                  </p>
                  <img
                    className="w-full h-full object-cover"
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
