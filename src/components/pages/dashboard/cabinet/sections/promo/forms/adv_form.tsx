import { useRouter } from 'next/router';
import { Heading } from 'src/components/ui/dashboard/heading';

export const AdvForm = () => {
    const { query } = useRouter();

    return (
        <div>
            <Heading title={query.params as string} desc="Промо-текст на все позиции прайс-листа" />
            asd
        </div>
    );
};
