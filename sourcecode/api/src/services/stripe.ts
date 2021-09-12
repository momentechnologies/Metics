import Stripe from 'stripe';
import stripeConfig from '../config/stripe.js';
import { Context } from '../graphql/context';
import NotFoundException from '../exceptions/notFound';
import { canAddCard } from './organization';
import ValidationException, { validationError } from '../exceptions/validation';
import { Organization } from '../types/db/Organization';

const stripe = new Stripe(stripeConfig.privateKey, {
    apiVersion: '2020-08-27',
});

const createStripeCustomer = async (organization: Organization) => {
    const customer = await stripe.customers.create({
        email: organization.billingEmail,
        name: organization.billingOrganizationName,
    });

    return customer.id;
};

export const addCardToOrganization = async (
    context: Context,
    organizationId: string,
    stripeCardId: string
) => {
    const organization = await context
        .db()
        .organization.getById.load(organizationId);

    if (!organization) {
        throw new NotFoundException('organization');
    }

    if (!canAddCard(organization)) {
        throw new ValidationException(
            validationError(
                'organizationId',
                'Organization needs more billing information in order to add card'
            )
        );
    }

    let stripeCustomerId = organization.stripeCustomerId;

    if (!stripeCustomerId) {
        stripeCustomerId = await createStripeCustomer(organization);

        await context.db().organization.update(organization.id, {
            stripeCustomerId,
        });
    }
};
