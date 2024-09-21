import React, { useEffect, useState } from 'react';
import { CheckListItem } from '@/cli/types.js';
import { Item } from './Item.js';

interface Props {
    items: CheckListItem[];
}

export const CheckList = ({ items }: Props) => {
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
            setCurrentIndex(null);
        }
    };

    return (
        <>
            {items.map((item, index) => (
                <Item
                    key={index}
                    item={{
                        ...item,
                        onFinish: () => {
                            item.onFinish();
                            handleFinish(index);
                        },
                    }}
                    start={index === currentIndex}
                />
            ))}
        </>
    );
};
