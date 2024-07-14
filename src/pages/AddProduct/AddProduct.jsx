import React, { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloseSharp } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import { RxImage } from "react-icons/rx";
import DragDropBox from "./DragDropBox";
import GetImageURLList from "./GetImageUrlList";
const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      setFiles((previousFiles) => [
        ...previousFiles,
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const removeFile = (file) => {
    // console.log(file);
    setFiles((previousFiles) =>
      previousFiles.filter((item) => item[0].name !== file)
    );
  };
  // console.log(files);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
  });
  const handleSubmit = async (e) => {
    let ImageUrlList = [];
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      const URL = await GetImageURLList(files[i]);
      ImageUrlList.push(URL);
    }

    const productDetails = {
      name: e.target.productName.value,
      description: e.target.description.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      category: e.target.category.value,
      discountType: e.target.discount_type.value,
      discount: e.target.discount.value,
      warranty: e.target.warranty.value,
      barcode: e.target.barcode.value,
      image: ImageUrlList,
      tags: e.target.tags.value,
    };
  };
  return (
    <div>
      <h1 className="text-2xl font font-semibold text-center">Add Products</h1>
      <p className="text-base text-center mt-2">
        Explore our cfiverse ShopZen collection: quahty products await
      </p>
      {/* Add product form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-4 lg:flex-row gap-5">
          <div className="w-1/2">
            {/* General information */}
            <div className="border border-gray-300 rounded-2xl px-4 py-4 flex flex-col gap-[10px]">
              <h3 className="text-2xl font-semibold">General Information</h3>
              <div className="mt-2">
                <label className="text-xl font-semibold ">Product Name</label>
                <input
                  type="text"
                  placeholder="Type product name"
                  className="block input w-full outline mt-3 outline-gray-200"
                  name="productName"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="text-xl font-semibold ">Description</label>
                <input
                  type="text"
                  placeholder="Product description"
                  className="block input w-full outline mt-3 outline-gray-200"
                  name="description"
                  required
                />
              </div>
            </div>
            {/*Product Media */}
            <div className="p-4 border rounded-xl mt-5">
              <h3 className="text-xl font-semibold">Product Media</h3>
              <p>Product Image</p>
              <div>
                {/* Preview images */}
                <div>
                  <ul className="grid grid-cols-1 rounded-xl lg:grid-cols-3  mt-5 border p-4">
                    <li className="mx-auto p-2 w-full lg:w-[200px]  flex justify-center items-center">
                      <div
                        {...getRootProps()}
                        className="outline-none
                     rounded-xl h-[100px] cursor-pointer border-2 border-dashed border-[#967dcb] w-full flex justify-center items-center min-h-[200px]"
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p>Drop the files here ...</p>
                        ) : (
                          <DragDropBox />
                        )}
                      </div>
                    </li>
                    {files.length > 0
                      ? files.map((file) => (
                          <li
                            key={file.path}
                            className=" cursor-pointer mx-auto p-2 rounded-xl ml-3 w-full lg:w-[200px]  flex justify-center items-center"
                          >
                            <div className="relative  mx-auto">
                              <img
                                src={file[0].preview}
                                alt="preview"
                                className="min-h-[200px] h-[100px]  rounded-xl border border-[#967dcb] w-full"
                              />
                              <IoCloseSharp
                                onClick={() => removeFile(file[0].name)}
                                className="absolute top-2 right-2  border border-[#967dcb]  w-6 h-6 rounded-full text-[#967dcb] hover:bg-[#967dcb] transition-all duration-300 hover:text-white  text-2xl hover:scale-105"
                              />
                            </div>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
            </div>
            {/* Inventory */}
            <div className="p-4 border rounded-xl mt-5">
              <h3 className="text-xl font-semibold">Inventory</h3>
              <div className="grid grid-cols-3">
                <div>
                  <label htmlFor=""></label>
                  <input
                    type="number"
                    placeholder="Warranty"
                    required
                    name="warranty"
                  />
                </div>
                <div>
                  <label htmlFor=""></label>
                  <input
                    type="number"
                    placeholder="Barcode"
                    required
                    name="barcode"
                  />
                </div>
                <div>
                  <label htmlFor=""></label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    required
                    name="quantity"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 space-y-3">
            <div className="p-4 border rounded-xl">
              <h3 className="text-2xl font-semibold">Pricing</h3>

              <div className="mt-3">
                <label htmlFor=""></label>
                <input
                  type="number"
                  placeholder="$ 00.00"
                  required
                  name="price"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>

              <div className="flex gap-5 mt-3">
                <div className="lg:w-1/2">
                  <label htmlFor="" className="text-xl font-semibold">
                    Discount{" "}
                  </label>
                  <input
                    type="number"
                    placeholder="Discount in percentage"
                    required
                    name="discount"
                    max={100}
                    className="input input-border w-full"
                  />
                </div>
                <div className="lg:w-1/2">
                  <label htmlFor="" className="text-xl font-semibold">
                    Discount Type
                  </label>
                  <select
                    name="discount_type"
                    className="select border border-[#967dcb] w-full "
                    id=""
                  >
                    <option value="Surprise Sale">Surprise Sale</option>
                    <option value="Festival Sale">Festival Sale</option>
                    <option value="Black Friday Sale">Black Friday</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-xl">
              <h3 className="text-2xl font-semibold">Category</h3>

              <div className="justify-between  flex mt-4 gap-3">
                <div className=" w-1/2 space-y-3">
                  <label htmlFor="" className="text-xl font-semibold">
                    Product Tags
                  </label>
                  <select
                    className="select select-primary  w-full block "
                    name="tags"
                  >
                    <option>Select Tags</option>
                    <option>Tv</option>
                    <option>Laptop</option>
                    <option>Desktop</option>
                    <option>Monitor</option>
                  </select>
                </div>
                <div className=" w-1/2 space-y-3">
                  <label htmlFor="" className="text-xl font-semibold">
                    Product Category
                  </label>
                  <select
                    className="select select-primary w-full  block"
                    name="category"
                  >
                    <option>Category</option>
                    <option>Gadget</option>
                    <option>Electronic Device</option>
                    <option>Accecories</option>
                    <option>Pc Components</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="flex items-center cursor-pointer gap-2 text-[#967dcb] border border-[#967dcb]  p-2 rounded-xl">
                <MdAddToPhotos className="text-2xl" htmlFor="" />
                <input type="submit" className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
