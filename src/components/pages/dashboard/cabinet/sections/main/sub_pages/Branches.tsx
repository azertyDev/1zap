import { Heading } from 'src/components/ui/dashboard/heading';

export const Branches = (props: any) => {
    const { pageProps } = props;

    return (
        <>
            <Heading title={pageProps.title} desc={pageProps.desc} />
        </>
    );
};
