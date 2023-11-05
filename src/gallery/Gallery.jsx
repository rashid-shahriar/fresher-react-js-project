import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { imageData } from "../data/Data";

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState(imageData); // Use state to manage images

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(images);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(reorderedImages);
  };

  const handleCheckboxChange = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDeleteFiles = () => {
    // Filter out the images that are not in the selectedImages array
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );

    // Update the images state with the modified array (images without the deleted items)
    setImages(updatedImages);

    // Clear the selectedImages state to reset the selection
    setSelectedImages([]);
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="bg-white pb-10 rounded-xl">
        <div className="px-10 py-5 border-b-2 mb-5 flex justify-between items-center">
          {selectedImages.length === 0 ? (
            <h1 className="text-xl font-bold">Gallery</h1>
          ) : (
            <h1 className="text-xl font-bold flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5" defaultChecked />
              {selectedImages.length}{" "}
              {selectedImages.length === 1 ? "File" : "Files"} selected
            </h1>
          )}
          {selectedImages.length > 0 && (
            <button
              className=" text-red-500 font-medium hover:underline cursor-pointer"
              onClick={handleDeleteFiles}
            >
              Delete {selectedImages.length === 1 ? "File" : "Files"}
            </button>
          )}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-5 gap-3 grid-rows-3 px-10"
              >
                {images.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                        className={`${
                          index === 0
                            ? "col-span-2 row-span-2 w-[25rem] h-[25rem]"
                            : "w-[12rem] h-[12rem]"
                        } relative group border-2  border-gray-200 rounded-xl overflow-hidden cursor-pointer`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                        />
                        {selectedImages.includes(item.id) && (
                          <div className="absolute inset-0 flex items-start justify-start p-4 bg-black bg-opacity-0 hover:bg-opacity-30 transition duration-300 ">
                            <input
                              type="checkbox"
                              className="h-5 w-5 transition duration-300 cursor-pointer"
                              onChange={() => handleCheckboxChange(item.id)}
                              checked
                            />
                          </div>
                        )}
                        {!selectedImages.includes(item.id) &&
                          hoveredIndex === index && (
                            <div className="absolute inset-0 flex items-start justify-start p-4 bg-black bg-opacity-0 hover:bg-opacity-30 transition duration-300 ">
                              <input
                                type="checkbox"
                                className="h-5 w-5 transition duration-300 cursor-pointer"
                                onChange={() => handleCheckboxChange(item.id)}
                              />
                            </div>
                          )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Gallery;
