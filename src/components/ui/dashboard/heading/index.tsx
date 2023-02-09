import { useRouter } from 'next/router';
import { Icon } from 'src/components/ui/icon';
import { IconsWrapper } from 'src/components/ui/icons_wrapper';
import s from './index.module.scss';

interface HeadingProps {
    title: string;
    desc: string;
}

export const Heading = ({ title, desc }: HeadingProps) => {
    const { back } = useRouter();

    return (
        <div className={s.wrapper}>
            <IconsWrapper onClick={() => back()} size="big">
                <Icon name="keyboard_arrow_left" size={18} />
            </IconsWrapper>
            <div className={s.body}>
                <p>{title}</p>
                <span>{desc}</span>
            </div>
        </div>
    );
};
