'use client';

const InlineScript = ({ html }) => (
  <script
    type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
    suppressHydrationWarning
    dangerouslySetInnerHTML={{__html: html}} />
);

export default InlineScript;
