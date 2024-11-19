import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FC } from "react";
import { ImageType } from "../utils/types";

interface GalleryProps {
  images: ImageType[];
  isLoading: boolean;
}

const Gallery: FC<GalleryProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded shadow-md">
            <Skeleton height={200} />
            <div className="p-2">
              <Skeleton className="mx-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="overflow-hidden rounded shadow-lg">
          <img
            src={`${image.download_url}?w=300&h=200`}
            alt={image.author}
            className="w-full h-48 object-cover"
          />
          <div className="p-2">
            <h2 className="text-sm font-semibold text-center">
              {image.author}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
