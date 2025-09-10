import { StatusMessage } from '@inkjs/ui';
import React, { useEffect, useState } from 'react';
import { CheckListItem } from '@/cli/types.js';
import { Item } from './Item.js';

export interface CheckListProps<TResult = unknown> {
    items: CheckListItem<TResult>[];
    onFinish?: (hasFailure: boolean) => void;
    display?:
        | 'silent'
        | Pick<
              CheckListItem<TResult>,
              | 'finishedDescription'
              | 'skipDescription'
              | 'errorDescription'
              | 'waitingDescription'
              | 'runningDescription'
          >;
}

export const CheckList = <TResult,>({
    items,
    onFinish,
    display,
}: CheckListProps<TResult>) => {
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
                    visible={!display && display !== 'silent'}
                    key={item.waitingDescription}
                    item={{
                        ...item,
                        onFinish: (result: TResult | false) => {
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
            {display && display !== 'silent' && (
                <StatusMessage variant="success">
                    {display?.finishedDescription(true as TResult)}
                </StatusMessage>
            )}
        </>
    );
};
