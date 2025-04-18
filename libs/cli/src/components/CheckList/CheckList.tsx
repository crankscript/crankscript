import React, { useEffect, useState } from 'react';
import { CheckListItem } from '@/cli/types.js';
import { Item } from './Item.js';

export interface CheckListProps {
    items: CheckListItem<unknown>[];
    onFinish?: (hasFailure: boolean) => void;
}

export const CheckList = ({ items, onFinish }: CheckListProps) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [hasFailure, setHasFailure] = useState(false);

    useEffect(() => {
        if (currentIndex === null && items.length > 0) {
            setCurrentIndex(0);
        }
    }, [currentIndex, items]);

    const handleFinish = (index: number) => {
        if (index + 1 < items.length) {
            setCurrentIndex(index + 1);
        } else {
            onFinish?.(hasFailure);
            setHasFailure(false);
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
                            if (result === false) {
                                setHasFailure(true);
                            }

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
