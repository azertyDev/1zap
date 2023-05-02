import { FC } from 'react';
import Link from 'next/link';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import { Icon } from 'src/components/ui/icon';
import { useTranslation } from 'next-i18next';
import s from './index.module.scss';

interface LinkBlockProps {
    link: string;
    icon: string;
    title: string;
    desc: string;
}

export const InfoLink: FC<LinkBlockProps> = ({ link, icon, title, desc }): JSX.Element => {
    const { t } = useTranslation('dashboard');
    return (
        <Link href={link} className={s.wrapper}>
            <IconsWrapper size="big">
                <Icon name={icon} size={22} />
            </IconsWrapper>
            <div>
                <p>{t(title)}</p>
                <span>{t(desc)}</span>
            </div>
        </Link>
    );
};
