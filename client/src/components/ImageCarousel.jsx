import { useState } from "react";

const ImageCarousel = ({ images, video }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="text-center">
      {video && index === 0 ? (
        <video src={video} controls className="mx-auto rounded" />
      ) : (
        <img src={images[index]} className="mx-auto rounded" />
      )}

      <div className="flex justify-center gap-2 mt-2">
        {[...(video ? [video] : []), ...images].map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;