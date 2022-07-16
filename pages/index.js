import React from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
//31
function HomePage(props) {
    return (
        <React.Fragment>
            <Head>
                <title>NextJS Meetups</title>
                <meta name='description' content='Some amazing meetups and collection for people of good!'></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </React.Fragment>
    );
}

export async function getStaticProps() {
    // every x seconds (revalidate)
    // fetch
    const client = await MongoClient.connect(
        'mongodb+srv://leko:mongodb@cluster0.1dbtc.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map((mtps) => {
                return {
                    title: mtps.title,
                    address: mtps.address,
                    image: mtps.image,
                    description: mtps.description,
                    id: mtps._id.toString(),
                };
            }),
        },
        revalidate: 1,
    };
}

/* export function getServerSideProps(context) {
    // every req
    const request = context.req;
    const response = context.res;
    return {
        props: { meetups: DUMMY_MEETUPS },
        revalidate: 1,
    };
} */

export default HomePage;
