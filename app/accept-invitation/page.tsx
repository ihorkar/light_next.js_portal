'use client'

import JumbotronPicture from '@/components/ui/jumbotron/JumbotronPicture';
import API from '@/utils/api/api';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        setIsMounted(true);

        if (isMounted && token) {
            API.acceptOrganisationInvitation(token)
                .then(response => {
                    setSuccess('Invitation accepted successfully!');
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError('Error accepting the invitation. Please try again.');
                    setLoading(false);
                });
        } else if (isMounted && !token) {
            setError('Invalid token provided.');
            setLoading(false);
        }
    }, [isMounted, token]);

    const renderJumbotronProps = () => {
        if (loading) {
            return {
                picture: "/whoneeds.jpg",
                Title: "Loading...",
                Description: "Please wait while we process your request.",
                PrimaryButtonLabel: "Let's go!",
                PrimaryButtononClick: () => router.push('/'),
                SecondaryButtonLabel: "Go to portal",
                SecondaryButtononClick: () => router.push('/'),
            };
        } else if (success) {
            return {
                picture: "/whoneeds.jpg",
                Title: "Success!",
                Description: success,
                PrimaryButtonLabel: "Let's go!",
                PrimaryButtononClick: () => router.push('/'),
                SecondaryButtonLabel: "Go to portal",
                SecondaryButtononClick: () => router.push('/'),
            };
        } else if (error) {
            return {
                picture: "/whoneeds.jpg",
                Title: "Oops, something went wrong!",
                Description: error,
                PrimaryButtonLabel: "Let's go!",
                PrimaryButtononClick: () => router.push('/'),
                SecondaryButtonLabel: "Go to portal",
                SecondaryButtononClick: () => router.push('/'),
            };
        } else {
            return {
                picture: "/whoneeds.jpg",
                Title: "The light portal is here",
                Description: "Are you ready to take your field marketing to the next level?",
                PrimaryButtonLabel: "Let's go!",
                PrimaryButtononClick: () => router.push('/'),
                SecondaryButtonLabel: "Go to portal",
                SecondaryButtononClick: () => router.push('/'),
            };
        }
    }

    const jumbotronProps = renderJumbotronProps();

    return (
        <div>
            {isMounted && <JumbotronPicture {...jumbotronProps} />}
        </div>
    );
}
