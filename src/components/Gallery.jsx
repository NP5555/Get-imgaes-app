import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaDownload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";


// import { FaImages } from "react-icons/fa6";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For full-screen modal
  const [showDownloadOption, setShowDownloadOption] = useState(false); // For download option
  const [pressTimer, setPressTimer] = useState(null); // Timer for press-and-hold

  const access_key = "KDw_FR1Uwtb9IaKcbe_aJrmPvYY_WcHkEqBL0mbSmr Q";

  const fetchRandomImages = async () => {
    const loadingToast = toast.loading("Keep Calm ... Your App is Starting");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${access_key}&count=12`
      );
      setImages(response.data);
      toast.dismiss(loadingToast);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load images");
      toast.dismiss(loadingToast);
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  const searchImages = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      fetchRandomImages();
      return;
    }

    const loadingToast = toast.loading("Searching for images...");
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${query}&per_page=12`
      );
      setImages(response.data.results);
      toast.dismiss(loadingToast);
      // setLoading(false);
    } catch (error) {
      toast.error("Search failed");
      toast.dismiss(loadingToast);
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  // Function to handle image click for full-screen view
  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the image for full-screen view
  };

  // Function to close the full-screen modal
  const closeModal = () => {
    setSelectedImage(null); // Close modal by setting selected image to null
    setShowDownloadOption(false); // Reset download option visibility
  };

  // Function to handle press-and-hold functionality for download option
  const handleMouseDown = () => {
    setPressTimer(
      setTimeout(() => {
        setShowDownloadOption(true); // Show download option after 5 seconds
      }, 5000)
    );
  };

  // Function to handle mouse release (or touch release)
  const handleMouseUp = () => {
    clearTimeout(pressTimer); // Cancel the press-and-hold timer
  };

  return (


<div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen">

  
  <div className="container mx-auto px-4 py-8">
  <Header/>
    <Toaster position="top-right" reverseOrder={false} />

    {/* Search Bar */}
    <div className="flex justify-center mb-8">
      <form
        onSubmit={searchImages}
        className="flex items-center bg-white shadow-md rounded-full px-4 py-2 w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
      >
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow outline-none px-2 text-gray-700"
        />
        <button type="submit" className="text-gray-500">
          <FaSearch size={20} />
        </button>
      </form>
    </div>

    {/* Image Gallery or Initial Content */}
    {images.length === 0 ? (
      <div className="flex flex-col justify-center items-center text-center h-64">
        <h1 className="text-gray-300 text-2xl italic">
          "Unleash the beauty of the world, one image at a time"
        </h1>
        <p className="text-white mt-4">Start by searching for images!</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-xl overflow-hidden shadow-xl transform transition hover:scale-105 bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-opacity-30"
            style={{ backdropFilter: "blur(10px)" }}
            onClick={() => handleImageClick(image)} // Open full-screen modal on click
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-4 text-white">
              <p className="text-gray-300 text-center font-sans">{image.user.name}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Full-Screen Modal */}
    {selectedImage && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="relative p-6 max-w-4xl w-full">
          <img
            src={selectedImage.urls.full}
            alt={selectedImage.alt_description}
            className="w-full h-auto"
          />
          <button
            className="absolute top-2 right-2 text-white text-xl"
            onClick={closeModal}
          >
            &times;
          </button>

          {/* Show Download Button on press-and-hold */}
          {showDownloadOption && (
            <a
              href={selectedImage.urls.full}
              download
              className="absolute bottom-2 right-2 text-white bg-gray-800 p-2 rounded-lg flex items-center"
            >
              <FaDownload className="mr-2" /> Download Image
            </a>
          )}
        </div>
      </div>
    )}
 <Footer/>
  </div>
</div>


  );
};

export default Gallery;
