import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

function NewMeetup() {

    const router = useRouter();

    async function addMeetup(meetupData) {
        const response = await fetch('/api/new-meetups', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    }

    return <NewMeetupForm onAddMeetup={addMeetup} />;
}

export default NewMeetup;
