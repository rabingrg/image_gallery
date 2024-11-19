import { useState, useEffect, FC } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ImageType } from "./utils/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Gallery from "./components/ImageGallery";

const App: FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 100;
  const totalPages = Math.ceil(totalImages / itemsPerPage);

  const getTotalImages = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=1&limit=1`
      );
      const totalCount =
        parseInt(response.headers["x-total-count"], 10) || 1000;
      setTotalImages(totalCount);
    } catch (error) {
      console.error("Error fetching total images:", error);
    }
  };

  const getAllImages = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page + 1}&limit=${itemsPerPage}`
      );
      setImages(response?.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getTotalImages();
  }, []);

  useEffect(() => {
    if (totalImages > 0) {
      getAllImages(currentPage);
    }
  }, [currentPage, totalImages]);

  return (
    <div className="p-5 flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-center mb-4">Image Gallery</h1>
      <Gallery images={images} isLoading={isLoading} />
      {totalImages > 0 && !isLoading && (
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          previousLabel={<ChevronLeft />}
          nextLabel={<ChevronRight />}
          breakLabel="..."
          containerClassName="flex justify-center mt-4 space-x-2"
          pageClassName="px-3 py-1 border rounded hover:bg-gray-100"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
          nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
        />
      )}
    </div>
  );
};

export default App;
