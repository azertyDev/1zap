import { useTranslation } from 'next-i18next';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Icon } from 'src/components/ui/icon';
import s from './index.module.scss';

interface IProps extends PropsWithChildren {
    open?: boolean;
    title: string;
}

export const Accordion: FC<IProps> = ({ open, children, title }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(open);
    const [height, setHeight] = useState<number | undefined>(open ? undefined : 0);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [isOpen]);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={s.wrapper}>
            <div className={s.titleBlock} onClick={handleFilterOpening}>
                <h6 className={s.titleBlock_title}>{t(`dashboard:${title}`)}</h6>
                <span className="btn">
                    {!isOpen ? (
                        <Icon name="add_circle_outline" size={18} />
                    ) : (
                        <Icon name="remove_circle_outline" size={18} />
                    )}
                </span>
            </div>

            <div className={s.collapsible_content} style={{ height }}>
                <div ref={ref}>{isOpen && children}</div>
            </div>
        </div>
    );
};
