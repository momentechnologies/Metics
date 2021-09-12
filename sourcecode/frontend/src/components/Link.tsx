import React, { Ref } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';

type Props = { to: string; [key: string]: any };

const Wrap = React.forwardRef((props: Props, ref: Ref<HTMLAnchorElement>) => (
    <RouterLink ref={ref} {...props} />
));

const Link = React.forwardRef((props: Props, ref: Ref<HTMLAnchorElement>) => (
    <MaterialLink component={Wrap} ref={ref} {...props} />
));

export default Link;
