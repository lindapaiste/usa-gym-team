import { ReactNode } from 'react';
import Link from 'next/link';

export interface MaybeLinkProps {
    children: ReactNode;
    href?: string;
    disableLink?: boolean;
    className?: string;
}

export default function MaybeLink({ children, href, className, disableLink }: MaybeLinkProps) {
    if (href && !disableLink) {
        return (
            <Link href={href} className={className}>{children}</Link>
        )
    }
    return <div className={className}>{children}</div>
}
