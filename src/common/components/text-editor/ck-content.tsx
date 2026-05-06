type Props = {
    value: string | TrustedHTML;
    className?: string;
};

function CKContent({ value, className }: Props) {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: value }}
        />
    );
}

export default CKContent;
