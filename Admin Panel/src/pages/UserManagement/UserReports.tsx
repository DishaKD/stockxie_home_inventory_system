import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const UserReports = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('User Reports'));
    });

    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">User Reports</h5>
            </div>
        </div>
    );
};

export default UserReports;
