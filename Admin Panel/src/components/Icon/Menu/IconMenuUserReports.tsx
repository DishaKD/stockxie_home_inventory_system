import { FC } from 'react';

interface IconMenuUserReportsProps {
    className?: string;
}

const IconMenuUserReports: FC<IconMenuUserReportsProps> = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                d="M 7 2 C 5.895 2 5 2.895 5 4 L 5 26 C 5 27.105 5.895 28 7 28 L 18.115234 28 C 19.378539 29.234557 21.102022 30 23 30 C 26.854334 30 30 26.854334 30 23 C 30 19.840326 27.885376 17.161502 25 16.296875 L 25 9.5 C 25 9.235 24.895031 8.9809688 24.707031 8.7929688 L 18.207031 2.2929688 C 18.019031 2.1049688 17.765 2 17.5 2 L 7 2 z M 17 3.9042969 L 23.095703 10 L 18 10 C 17.448 10 17 9.552 17 9 L 17 3.9042969 z M 23 18 C 25.773666 18 28 20.226334 28 23 L 23 23 L 23 28 C 20.226334 28 18 25.773666 18 23 C 18 20.226334 20.226334 18 23 18 z"
                fill="currentColor"
            />
            <path
                opacity="0.5"
                d="M 7 2 C 5.895 2 5 2.895 5 4 L 5 26 C 5 27.105 5.895 28 7 28 L 18.115234 28 C 19.378539 29.234557 21.102022 30 23 30 C 26.854334 30 30 26.854334 30 23 C 30 19.840326 27.885376 17.161502 25 16.296875 L 25 9.5 C 25 9.235 24.895031 8.9809688 24.707031 8.7929688 L 18.207031 2.2929688 C 18.019031 2.1049688 17.765 2 17.5 2 L 7 2 z M 17 3.9042969 L 23.095703 10 L 18 10 C 17.448 10 17 9.552 17 9 L 17 3.9042969 z M 23 18 C 25.773666 18 28 20.226334 28 23 L 23 23 L 23 28 C 20.226334 28 18 25.773666 18 23 C 18 20.226334 20.226334 18 23 18 z"
                fill="currentColor"
            />
        </svg>
    );
};

export default IconMenuUserReports;
