'use client'

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
    useSessionContext,
    useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const AuthSession = () => {
    const { session } = useSessionContext();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (session) {
            router.refresh();
        }
    }, [session, router]);

    return (
        <Auth
            supabaseClient={supabaseClient}
            providers={[]}
            magicLink={true}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#40A2E3',
                        },
                    },
                },
            }}
            theme='light'
            view={'sign_in'}
        />

    );


}

export default AuthSession