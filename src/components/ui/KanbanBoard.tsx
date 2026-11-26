import React from 'react';
import { KanbanColumn } from './KanbanColumn';

export interface KanbanColumnDef {
  id: string;
  title: string;
  accentColor?: string;
}

interface KanbanBoardProps<T> {
  columns: KanbanColumnDef[];
  items: T[];
  getGroupKey: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
  onActionClick?: (columnId: string) => void;
  className?: string;
}

export function KanbanBoard<T>({
  columns,
  items,
  getGroupKey,
  renderCard,
  onActionClick,
  className = ''
}: KanbanBoardProps<T>) {
  // Helper to get items for a specific column
  const getItemsForColumn = (columnId: string) => {
    return items.filter(item => getGroupKey(item) === columnId);
  };

  return (
    <div className={`w-full md:overflow-x-auto pb-4 custom-scrollbar ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:min-h-[600px] px-0 sm:px-2">
        {columns.map((column) => {
          const columnItems = getItemsForColumn(column.id);
          
          return (
            <KanbanColumn
              key={column.id}
              title={column.title}
              count={columnItems.length}
              accentColor={column.accentColor}
              onActionClick={onActionClick ? () => onActionClick(column.id) : undefined}
            >
              {columnItems.map((item, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                  {renderCard(item)}
                </div>
              ))}
            </KanbanColumn>
          );
        })}
      </div>
    </div>
  );
}
