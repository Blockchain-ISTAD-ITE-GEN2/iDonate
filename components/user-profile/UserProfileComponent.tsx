
"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { EditprofileType, UpdateProfileImageType, userProfileinfoType } from '@/lib/definition';
import { useState, useEffect } from 'react';
import {
    useGetUserProfileQuery,
    useUpdateAvatarMutation,
    useUpdateUserProfileMutation,
} from '@/redux/services/user-profile';
import { useRouter } from 'next/navigation';
import { useUploadSingleMediaMutation } from '@/redux/services/media';
import { UploadImageResponse } from '@/lib/definition';


const FILE_SIZE = 1024 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const fieldStyle = 'border border-gray-300 rounded-full w-full';

const EditFormComponent = ({ userUUID }: { userUUID: any }) => {
    
    console.log("UUID : ", userUUID);
    const router = useRouter();

    localStorage.setItem('uuid', userUUID);

    const { data: userProfile, isLoading } = useGetUserProfileQuery(userUUID);

    const [updateAvatar] = useUpdateAvatarMutation();

    const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

    const [uploadMedia, { isLoading: isUploading }] = useUploadSingleMediaMutation();

    const initialValues: EditprofileType = {
        username: userProfile?.username || '',
        firstName: userProfile?.firstName || '',
        lastName: userProfile?.lastName || '',
        gender: userProfile?.gender || '',
        phoneNumber: userProfile?.phoneNumber || '',
        dateOfBirth: userProfile?.dateOfBirth || '',
        avatar: '',
    };

    const validationSchema = Yup.object({
        avatar: Yup.mixed()
            .test('fileSize', 'File too large', (value: any) => !value || value.size <= FILE_SIZE)
            .test('fileFormat', 'Unsupported Format', (value: any) => !value || SUPPORTED_FORMATS.includes(value.type)),
    });

    // Function to handle avatar update
    const handleUpdateUser = async (file: any) => {
        try {
            const res = await uploadMedia(file).unwrap();
    
            // Extract the response details
            const uploadImageResponse: UploadImageResponse = {
                name: res?.name,
                contentType: res?.contentType,
                size: res?.size,
                uri: res?.uri,
                extension: res?.extension,
            };
    
            const imageUri: UpdateProfileImageType = {
                image: uploadImageResponse.name
            };

            const userUUID = localStorage.getItem('uuid');
            console.log(userUUID);
    
            // Update avatar user
            await updateAvatar({
                uuid: userUUID || '',
                updatedProfileImage: imageUri,
            }).unwrap();
    
            // toast.success('Avatar updated successfully');
        } catch (error) {
            console.error('Error while uploading avatar:', error);
            // toast.error('Error while uploading avatar');
        }
    };    

    // Function to handle user info update
    const handleUpdateuserInfo = async (values: userProfileinfoType) => {
        try {
            await updateUserProfile({
                uuid: userUUID,
                updatedUserProfile: {
                    username: values.username || userProfile?.username,
                    firstName: values.firstName || userProfile?.firstName,
                    lastName: values.lastName || userProfile?.lastName,
                    gender: values.gender || userProfile?.gender,
                    phoneNumber: userProfile?.phoneNumber,
                    dateOfBirth: userProfile?.dateOfBirth,
                    avatar: userProfile?.avatar || '',
                    email: userProfile?.email || '',
                    position: userProfile?.position || '',
                    role: userProfile?.role || '',
                    address: userProfile?.address || '',
                    isActive: userProfile?.isActive || false,
                    isFavourite: userProfile?.isFavourite || false,
                    createdAt: userProfile?.createdAt || '',
                    updatedAt: userProfile?.updatedAt || '',
                },
            });
            // toast.success('User info updated successfully');
            router.push('/'); 
        } catch (error) {
            // toast.error('Error while updating user info');
            console.error('Error updating user info:', error);
        }
    };


 
    const CustomInput = ({ field, form, setFieldValue, ...props }: any) => {
        const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
        const [error, setError] = useState<string | undefined>(undefined);
        const name = field.name;

        useEffect(() => {
            if (field.value) {
                setPreviewImage(URL.createObjectURL(field.value));
            }
        }, [field.value]);

        const onDrop = async (acceptedFiles: any, rejectedFiles: any) => {
            if (rejectedFiles.length > 0) {
                setError('Unsupported format or file too large');
                return;
            }
            const file = acceptedFiles[0];
            setFieldValue(name, file); 
            setPreviewImage(URL.createObjectURL(file));
            setError(undefined); 
        };

        const { getRootProps, getInputProps } = useDropzone({
            onDrop,
            maxSize: FILE_SIZE,
        });

        return (
            <div {...getRootProps()} className="w-full h-full flex items-center justify-center cursor-pointer">
                <input {...getInputProps()} />
                {previewImage ? (
                    <Image
                        className="rounded-full border object-cover w-full h-full"
                        src={previewImage}
                        alt="preview Image"
                        width={1000}
                        height={1000}
                        style={{ borderRadius: '50%' }}
                    />
                ) : (
                    <Image
                        className="rounded-full border object-cover w-full h-full"
                        src={userProfile?.avatar || "https://idata-api.istad.co/public-media/7ef3b0f4-d466-4aa2-8aaa-f4f0ec498541.jpg"}
                        alt="preview Image"
                        width={224}
                        height={224}
                        style={{ borderRadius: '50%' }}
                    />
                )}
                {error && <div className="error">{error}</div>}
            </div>
        );
    };

    return (
        <div className="w-full pt-9">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    const { avatar, ...userInfo } = values;
                    if (avatar) {
                        await handleUpdateUser(avatar); 
                    }
                    const completeUserInfo: userProfileinfoType = {
                        ...userInfo,
                        avatar: userProfile?.avatar || '',
                        email: userProfile?.email || '',
                        position: userProfile?.position || '',
                        role: userProfile?.role || '',
                        address: userProfile?.address || '',
                        isActive: userProfile?.isActive || false,
                        isFavourite: userProfile?.isFavourite || false,
                        createdAt: userProfile?.createdAt || '',
                        updatedAt: userProfile?.updatedAt || '',
                    };
                    await handleUpdateuserInfo(completeUserInfo);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="flex flex-col md:flex-row gap-5 py-5 px-[20px] lg:px-[60px]">
                        <div className="flex flex-col items-center md:w-1/3">
                            <div className="w-56 h-56 border-2 rounded-full overflow-hidden mb-1.5">
                                <Field name="avatar" component={CustomInput} setFieldValue={setFieldValue} />
                                <ErrorMessage name="avatar">
                                    {(msg) => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="position" className="text-h16 text-primaryColor">
                                    Position
                                </label>
                                <Field
                                    placeholder={userProfile?.position || "N/A"}
                                    className={fieldStyle}
                                    name="position"
                                    type="text"
                                />
                                <ErrorMessage name="position">
                                    {(msg) => <p className="text-red-600 text-h16 italic">{msg}</p>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 ">
                            <div className="flex gap-x-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="firstName" className="text-h16 text-primaryColor">
                                        First Name
                                    </label>
                                    <Field
                                        placeholder={userProfile?.firstName || 'N/A'}
                                        className={fieldStyle}
                                        name="firstName"
                                        type="text"
                                    />
                                    <ErrorMessage name="firstName">
                                        {(msg) => <p className="text-red-600 text-h16 italic">{msg}</p>}
                                    </ErrorMessage>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="lastName" className="text-h16 text-primaryColor">
                                        Last Name
                                    </label>
                                    <Field
                                        placeholder={userProfile?.lastName || 'N/A'}
                                        className={fieldStyle}
                                        name="lastName"
                                        type="text"
                                    />
                                    <ErrorMessage name="lastName">
                                        {(msg) => <p className="text-red-600 text-h16 italic">{msg}</p>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="username" className="text-h16 text-primaryColor">
                                    Username
                                </label>
                                <Field
                                    placeholder={userProfile?.username || 'N/A'}
                                    className={fieldStyle}
                                    name="username"
                                    type="text"
                                />
                                <ErrorMessage name="username">
                                    {(msg) => <p className="text-red-600 text-h16 italic">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            <div>
                                <button
                                    
                                    type="submit"
                                    onClick={()=>handleUpdateuserInfo}
                                    className="w-full px-4 py-3 bg-primaryColor text-white rounded-full bg-blue-500"
                                    disabled={isSubmitting || isUpdating || isUploading} 
                                   
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditFormComponent;
