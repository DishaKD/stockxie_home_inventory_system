import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setPageTitle } from '../../store/themeConfigSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const UserReports = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState<User[]>([]);
    const [userStats, setUserStats] = useState<UserStat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const chartRef = useRef<HTMLDivElement>(null);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(setPageTitle('User Reports'));
        fetchUsers();
    }, [dispatch]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/auth/users');
            console.log('API Response:', response.data);

            // Ensure you're accessing the 'users' array from the response data
            if (response.data && Array.isArray(response.data.users)) {
                const sortedUsers = response.data.users.sort((a: User, b: User) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                setUsers(sortedUsers);
                generateUserStats(sortedUsers);
            } else {
                console.error('No users found or invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    interface User {
        id: number;
        username: string;
        email: string;
        createdAt: string;
    }

    interface UserStat {
        date: string;
        count: number;
        total: number;
    }

    const generateUserStats = (users: User[]) => {
        // Track monthly registrations
        const monthlyData: { [key: string]: { count: number } } = {};

        users.forEach((user) => {
            if (user.createdAt) {
                const date = new Date(user.createdAt);
                if (!isNaN(date.getTime())) {
                    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                    if (!monthlyData[month]) {
                        monthlyData[month] = { count: 0 };
                    }
                    monthlyData[month].count += 1;
                }
            }
        });

        // Convert to array with running total
        const months = Object.keys(monthlyData).sort();
        const stats: UserStat[] = [];
        let runningTotal = 0;

        months.forEach((month) => {
            const count = monthlyData[month].count;
            runningTotal += count;
            stats.push({
                date: month,
                count: count,
                total: runningTotal,
            });
        });

        setUserStats(stats);
    };

    const downloadPDF = async () => {
        if (!reportRef.current) return;

        try {
            // Show loading state
            const originalText = document.getElementById('download-btn')?.textContent;
            if (document.getElementById('download-btn')) {
                document.getElementById('download-btn')!.textContent = 'Generating PDF...';
                document.getElementById('download-btn')!.setAttribute('disabled', 'true');
            }

            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                logging: false,
                useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.setFontSize(16);
            pdf.text('User Growth Report', pdfWidth / 2, 15, { align: 'center' });
            pdf.setFontSize(10);
            pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pdfWidth / 2, 22, { align: 'center' });

            pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight);
            pdf.save('user-growth-report.pdf');

            // Reset button
            if (document.getElementById('download-btn')) {
                document.getElementById('download-btn')!.textContent = originalText || 'Download Report';
                document.getElementById('download-btn')!.removeAttribute('disabled');
            }
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');

            if (document.getElementById('download-btn')) {
                document.getElementById('download-btn')!.textContent = 'Download Report';
                document.getElementById('download-btn')!.removeAttribute('disabled');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-80">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="panel mt-6" ref={reportRef}>
                <div className="flex justify-between items-center mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">User Reports</h5>
                    <button id="download-btn" className="btn btn-primary flex items-center" onClick={downloadPDF}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                        </svg>
                        Download Report
                    </button>
                </div>

                {/* User Growth Chart */}
                <div className="mb-10" ref={chartRef}>
                    <h6 className="mb-3 font-semibold">User Growth Over Time</h6>
                    <div className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip formatter={(value, name) => [value, name === 'total' ? 'Total Users' : 'New Users']} labelFormatter={(label) => `Month: ${label}`} />
                                <Legend />
                                <Line type="monotone" dataKey="total" name="Total Users" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="count" name="New Users" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <h6 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Users</h6>
                        <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <h6 className="text-sm text-gray-500 dark:text-gray-400 mb-1">New Users (Last Month)</h6>
                        <p className="text-2xl font-bold">{userStats.length > 0 ? userStats[userStats.length - 1].count : 0}</p>
                    </div>
                    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                        <h6 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Growth Rate</h6>
                        <p className="text-2xl font-bold">
                            {userStats.length > 1 ? `${((userStats[userStats.length - 1].count / userStats[userStats.length - 2].count - 1) * 100).toFixed(1)}%` : 'N/A'}
                        </p>
                    </div>
                </div>

                {/* User Table */}
                <div>
                    <h6 className="mb-3 font-semibold">User List</h6>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border border-gray-200 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-2">{user.id}</td>
                                        <td className="px-4 py-2">{user.username}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReports;
