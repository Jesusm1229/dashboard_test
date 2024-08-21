import { Button } from "@/components/ui/button";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export default function Home() {
    const supabase = createClient()
    /* 
        const { data, error } =  supabase.auth.getUser()
        if (error || !data?.user) {
            redirect('/sign-in')
        }
     */

    return (
        <div>
            {/* {data.user.email} */}
            <Button >
                Add an account
            </Button>
        </div>
    );
}