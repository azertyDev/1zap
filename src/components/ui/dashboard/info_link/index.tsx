import { FC } from 'react';
import Link from 'next/link';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import { Icon } from 'src/components/ui/icon';
import s from './index.module.scss';

interface LinkBlockProps {
    link: string;
    icon: string;
    title: string;
    desc: string;
}

export const InfoLink: FC<LinkBlockProps> = ({
    link,
    icon,
    title,
    desc,
}): JSX.Element => {
    return (
        <Link href={link} className={s.wrapper}>
            <IconsWrapper style={s.icon_wrapper}>
                <Icon name={icon} size="22" />
            </IconsWrapper>
            <div>
                <p>{title}</p>
                <span>{desc}</span>
            </div>
        </Link>
    );
};
