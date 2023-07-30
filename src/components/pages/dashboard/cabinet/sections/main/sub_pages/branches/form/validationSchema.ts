import * as Yup from 'yup';

export const schema = {
    create_branch: Yup.object().shape({
        branchName: Yup.string().required('required'),
        location: Yup.string().required('location_required'),
        landmark: Yup.string().required('required'),
        managerName: Yup.string().required('required'),
        phisicalAddress: Yup.string().required('required'),
        images: Yup.array().of(
            Yup.object().shape({
                // id: Yup.number().required('required'),
                url: Yup.string().required('image_required'),
            })
        ),

        phones: Yup.array().of(
            Yup.object().shape({
                isActive: Yup.string(),
            })
        ),
        city: Yup.string(),
        // branchType: Yup.string(),
        // workingSchedule: Yup.string(),
        // weekendSchedule: Yup.string(),
        // weekend: Yup.string(),
        // breakTime: Yup.string(),

        // payment: Yup.array().of(
        //     Yup.object().shape({
        //         isActive: Yup.bool().required('Image is required'),
        //     })
        // ),
        // delivery: Yup.array().of(
        //     Yup.object().shape({
        //         isActive: Yup.bool().required('Image is required'),
        //     })
        // ),
        // service: Yup.array().of(
        //     Yup.object().shape({
        //         isActive: Yup.bool().required('Image is required'),
        //     })
        // ),
        // clientType: Yup.array().of(
        //     Yup.object().shape({
        //         isActive: Yup.bool().required('Image is required'),
        //     })
        // ),
    }),
};
