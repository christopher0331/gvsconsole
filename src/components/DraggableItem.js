import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, children, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id: 'exampleId', type: 'box' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        moveItem(item.id, dropResult.id);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableItem;
