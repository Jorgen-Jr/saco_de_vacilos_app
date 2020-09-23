import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './style.css';

const CardCount = ({ data, title }) => {
    return (
        <Card className="card-count" variant="outlined">
            <CardContent>
                <p> Este é um cartão simples</p>
            </CardContent>
        </Card>
    );
}

export default (CardCount);