import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const DroppableItem = ({ id, children, moveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => ({ id }),
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgrey' : 'white' }}>
      <DraggableItem id={id} moveItem={moveItem}>
        {children}
      </DraggableItem>
    </div>
  );
};

export default DroppableItem;
