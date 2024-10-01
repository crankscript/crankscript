import React, { useEffect, useState } from 'react';
import { CheckListItem } from '@/cli/types.js';
import { Item } from './Item.js';

interface Props {
    items: CheckListItem<unknown>[];
    onFinish?: () => void;
}

export const CheckList = ({ items, onFinish }: Props) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        if (currentIndex === null && items.length > 0) {
            setCurrentIndex(0);
        }
    }, [currentIndex, items]);

    const handleFinish = (index: number) => {
        if (index + 1 < items.length) {
            setCurrentIndex(index + 1);
        } else {
            onFinish?.();
        }
    };

    return (
        <>
            {items.map((item, index) => (
                <Item
                    key={item.waitingDescription}
                    item={{
                        ...item,
                        onFinish: (result: unknown) => {
                            item?.onFinish?.(result);
                            handleFinish(index);
                        },
                    }}
                    start={index === currentIndex}
                />
            ))}
        </>
    );
};
