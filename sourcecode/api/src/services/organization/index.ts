import { Organization } from '../../types/db/Organization';

export const canAddCard = (organization: Organization) => {
    return (
        organization.billingCountryCode &&
        organization.billingOrganizationName &&
        organization.billingAddress &&
        organization.billingEmail
    );
};
