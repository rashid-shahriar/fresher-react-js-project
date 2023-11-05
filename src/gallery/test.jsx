import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { SortableGrid } from "@dnd-kit/sortable";
import imageOne from "../assets/images/image-1.webp";
import imageTwo from "../assets/images/image-2.webp";
import imageThree from "../assets/images/image-3.webp";
import imageFour from "../assets/images/image-4.webp";
import imageFive from "../assets/images/image-5.webp";
import imageSix from "../assets/images/image-6.webp";
import imageSeven from "../assets/images/image-7.webp";
import imageEight from "../assets/images/image-8.webp";
import imageNine from "../assets/images/image-9.webp";

const Gallery = () => {
  const [items, setItems] = useState([
    { id: 1, url: imageOne },
    { id: 2, url: imageTwo },
    { id: 3, url: imageThree },
    { id: 4, url: imageFour },
    { id: 5, url: imageFive },
    { id: 6, url: imageSix },
    { id: 7, url: imageSeven },
    { id: 8, url: imageEight },
    { id: 9, url: imageNine },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) =>
        arrayMove(
          items,
          items.findIndex((item) => item.id === active.id),
          items.findIndex((item) => item.id === over.id)
        )
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <SortableGrid
          columns={3}
          rowHeight={100}
          items={items}
          strategy={verticalListSortingStrategy}
          getContainer={() => document.body}
        >
          {(item) => <SortableItem key={item.id} id={item.id} url={item.url} />}
        </SortableGrid>
      </SortableContext>
      <div className="h-48 w-48">
        <DroppableItem />
      </div>
    </DndContext>
  );
};

const DroppableItem = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    backgroundColor: isOver ? "#F0F9FF" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      Drop here!
    </div>
  );
};

export default Gallery;
