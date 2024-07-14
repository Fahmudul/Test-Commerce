const GetImageURLList = async (file) => {
  const formData = new FormData();
  const url = "https://api.cloudinary.com/v1_1/da9tj7fus/image/upload";

  formData.append("file", file[0]);
  formData.append("upload_preset", "ecommerce-product");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log(data.secure_url);
  return data.secure_url;
};

export default GetImageURLList;
