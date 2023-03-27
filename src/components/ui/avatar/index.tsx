import Image from 'next/image';

interface PropsType {
    src: string;
    alt: string;
    size?: number;
}

export const Avatar = ({ src, alt, size = 44 }: PropsType): JSX.Element => {
    return (
        <Image
            priority
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
    );
};
