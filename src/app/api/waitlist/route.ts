import {NextResponse} from 'next/server';
import {createClient} from "@/src/lib/supabase/server"
import {waitlistService} from '@/src/lib/supabase/db';

export async function POST(request: Request) {
    try {
        const {email} = await request.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json({message: 'Invalid email format.'}, {status: 400});
        }

        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({message: 'Invalid email address.'}, {status: 400});
        }

        const supabase = await createClient()

        // Check if email already exists
        const exists = await waitlistService.checkEmailExists(supabase, email);
        if (exists) {
            return NextResponse.json({message: 'Email already registered.'}, {status: 400});
        }

        // Add to waitlist
        const x = await waitlistService.addToWaitlist(supabase, email);
        console.error('Waitlist submission error: x', x);


        if (x.error) {
            console.error('Waitlist submission error:', x.error);
            return NextResponse.json({message: 'Failed to join waitlist.'}, {status: 500});
        }

        return NextResponse.json({message: 'Successfully joined waitlist!'}, {status: 200});

    } catch (error) {
        console.error('Waitlist API error:', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}
