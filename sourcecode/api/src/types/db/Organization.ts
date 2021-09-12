export type Organization = {
    id: string | number;
    name: string;
    stripeCustomerId?: string;
    billingCountryCode?: string;
    billingOrganizationName?: string;
    billingAddress?: string;
    billingEmail?: string;
};
