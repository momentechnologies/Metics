import React from 'react';
import Billing from './Billing';

const BillingContainer = ({ match }) => {
    return (
        <Billing
            urls={{
                updateSubscription: `${match.url}/update-subscription`,
            }}
        />
    );
};

export default BillingContainer;
