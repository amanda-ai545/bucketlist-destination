import { useState, useEffect } from 'react';
import { ItemsTypes } from '../types';

export const useLimitItems = (items: ItemsTypes[], limitTo: number) => {
  const [limitItems, setLimitItems] = useState<ItemsTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLimitItems = () => {
    setIsLoading(true);

    if (limitTo) {
      const limitItems = items.filter((item: ItemsTypes, idx: number) => idx < limitTo);
      setLimitItems(limitItems);
    } else {
      setLimitItems(items);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    handleLimitItems();
  }, [items]);

  return { limitItems, isLoading };
};