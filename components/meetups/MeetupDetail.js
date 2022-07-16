import React from 'react';
import classes from './MeetupDetail.module.css';
import Head from 'next/head';

function MeetupDetail(props) {
    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.description}></meta>
            </Head>
            <section className={classes.details}>
                <img src={props.image} alt={props.title}></img>
                <h1>{props.title}</h1>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </section>
        </React.Fragment>
    );
}

export default MeetupDetail;
