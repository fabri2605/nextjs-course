import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';

function MeetupDetails(props) {
    return (
        <React.Fragment>
            <MeetupDetail
                title={props.meetupData.title}
                description={props.meetupData.description}
                image={props.meetupData.image}
                address={props.meetupData.address}
            ></MeetupDetail>
        </React.Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://leko:mongodb@cluster0.1dbtc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const data = db.collection('meetups');
    const meetups = await data.find({}, { _id: 1 }).toArray();
    return {
        fallback: false,
        paths: meetups.map((mu) => {
            return {
                params: {
                    meetupId: mu._id.toString(),
                },
            };
        }),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(
        'mongodb+srv://leko:mongodb@cluster0.1dbtc.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const data = db.collection('meetups');
    const meetup = await data.findOne({ _id: ObjectId(meetupId) });
    client.close();
    console.log(meetup);
    return {
        props: {
            meetupData: {
                title: meetup.title,
                description: meetup.description,
                image: meetup.image,
                address: meetup.address,
                id: meetupId,
            },
        },
    };
}

export default MeetupDetails;
