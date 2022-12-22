import Image from 'next/image';

interface PropsType {
    src: string;
    alt: string;
    size?: number;
}

export default ({ src, alt, size = 44 }: PropsType): JSX.Element => {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
    );
};
