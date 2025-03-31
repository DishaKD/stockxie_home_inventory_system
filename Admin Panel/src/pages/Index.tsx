import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { useEffect } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';

// Icons
import { TrendingUp, Plus, Check, Clock, Mail, CreditCard, Users, MessageSquare, HelpCircle, FileText, ExternalLink, BarChart2, Settings, Bell, MoreHorizontal } from 'lucide-react';

const Analytics = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard Analytics'));
    });

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    // User Growth Chart
    const userGrowth: any = {
        series: [{ data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 85] }],
        options: {
            chart: {
                height: 90,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#4361ee',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    opacityFrom: 0.8,
                    opacityTo: 0.2,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return 'Users:';
                        },
                    },
                },
            },
        },
    };

    // Support Ticket Stats
    const supportTickets: any = {
        series: [{ data: [12, 25, 18, 35, 30, 40, 35, 45, 32, 38, 28, 32] }],
        options: {
            chart: {
                height: 90,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: '#00ab55',
                    opacity: 0.4,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#00ab55'],
            grid: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    opacityFrom: 0.8,
                    opacityTo: 0.2,
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return 'Tickets:';
                        },
                    },
                },
            },
        },
    };

    // User Acquisition Chart
    const userAcquisition: any = {
        series: [
            {
                name: 'Organic',
                data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 95],
            },
            {
                name: 'Referral',
                data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            },
            {
                name: 'Social',
                data: [42, 38, 45, 50, 54, 48, 52, 47, 58, 52, 46, 55],
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee', '#00ab55', '#805dca'],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 0.6,
                    opacityTo: 0.1,
                    stops: [0, 100],
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: isDark ? '#888ea8' : '#506690',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: isDark ? '#888ea8' : '#506690',
                    },
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                offsetY: 8,
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    radius: 12,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };

    // Support Ticket Status
    const ticketStatus: any = {
        series: [45, 30, 25],
        options: {
            chart: {
                type: 'donut',
                height: 320,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 3,
                colors: isDark ? ['#0e1726'] : ['#fff'],
            },
            colors: ['#4361ee', '#e7515a', '#805dca'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    radius: 6,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '16px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '20px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val) => {
                                    return val + '%';
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '16px',
                                formatter: (w) => {
                                    return (
                                        w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b;
                                        }, 0) + '%'
                                    );
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Open', 'Resolved', 'Pending'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0,
                    },
                },
            },
        },
    };

    // Recent Tickets
    const recentTickets = [
        { id: '#3682', subject: 'Login issues on mobile app', status: 'Open', priority: 'High', date: '15 min ago', user: 'John Smith', img: '/assets/images/profile-1.jpeg' },
        { id: '#3681', subject: 'Payment not processing', status: 'Pending', priority: 'Medium', date: '2 hours ago', user: 'Emily Chen', img: '/assets/images/profile-2.jpeg' },
        { id: '#3680', subject: 'Feature request: Dark mode', status: 'Open', priority: 'Low', date: '4 hours ago', user: 'David Wilson', img: '/assets/images/profile-3.jpeg' },
        { id: '#3679', subject: 'Data export not working', status: 'Resolved', priority: 'Medium', date: 'Yesterday', user: 'Sarah Adams', img: '/assets/images/profile-4.jpeg' },
        { id: '#3678', subject: 'Account verification failed', status: 'Open', priority: 'High', date: 'Yesterday', user: 'Mike Johnson', img: '/assets/images/profile-5.jpeg' },
    ];

    // Status colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-primary/20 text-primary';
            case 'Resolved':
                return 'bg-success/20 text-success';
            case 'Pending':
                return 'bg-warning/20 text-warning';
            default:
                return 'bg-info/20 text-info';
        }
    };

    // Priority colors
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-danger/20 text-danger';
            case 'Medium':
                return 'bg-warning/20 text-warning';
            case 'Low':
                return 'bg-success/20 text-success';
            default:
                return 'bg-info/20 text-info';
        }
    };

    return (
        <div>
            {/* Header with Navigation and Logo */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center">
                    {/* Logo Placeholder */}
                    <div className="bg-primary/10 rounded-xl w-12 h-12 flex items-center justify-center mr-4">
                        <span className="text-[#00a2a9] font-bold text-xl">AC</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white-light">Analytics Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400">Monitoring user growth and support management</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" className="btn btn-outline-primary ">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                    </button>
                    <button type="button" className="btn btn-primary ">
                        <Plus className="w-4 h-4 mr-2" />
                        New Report
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <div className="bg-primary/10 rounded-xl w-11 h-11 flex items-center justify-center">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3">
                            <h5 className="font-semibold text-lg text-gray-500 dark:text-gray-400">Total Users</h5>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-3xl font-bold dark:text-white-light">45,631</h2>
                        <span className="badge bg-success/20 text-success rounded-full px-3 py-1 text-xs flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +25%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Compared to last month (36,894)</p>
                    <div className="mt-5">
                        <ReactApexChart series={userGrowth.series} options={userGrowth.options} type="area" height={90} />
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <div className="bg-success/10 rounded-xl w-11 h-11 flex items-center justify-center">
                            <HelpCircle className="w-6 h-6 text-success" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3">
                            <h5 className="font-semibold text-lg text-gray-500 dark:text-gray-400">Support Tickets</h5>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-3xl font-bold dark:text-white-light">457</h2>
                        <span className="badge bg-danger/20 text-danger rounded-full px-3 py-1 text-xs flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                            -8%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">125 tickets pending resolution</p>
                    <div className="mt-5">
                        <ReactApexChart series={supportTickets.series} options={supportTickets.options} type="area" height={90} />
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <div className="bg-warning/10 rounded-xl w-11 h-11 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-warning" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3">
                            <h5 className="font-semibold text-lg text-gray-500 dark:text-gray-400">Avg. Response Time</h5>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-3xl font-bold dark:text-white-light">3.5h</h2>
                        <span className="badge bg-success/20 text-success rounded-full px-3 py-1 text-xs flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +12%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SLA target: 4 hours</p>
                    <div className="w-full h-2 bg-dark-light/10 rounded-full mt-5">
                        <div className="h-full rounded-full bg-warning" style={{ width: '72%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                        <span>0h</span>
                        <span>Target: 4h</span>
                        <span>8h</span>
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <div className="bg-info/10 rounded-xl w-11 h-11 flex items-center justify-center">
                            <BarChart2 className="w-6 h-6 text-info" />
                        </div>
                        <div className="ltr:ml-3 rtl:mr-3">
                            <h5 className="font-semibold text-lg text-gray-500 dark:text-gray-400">User Satisfaction</h5>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-3xl font-bold dark:text-white-light">92%</h2>
                        <span className="badge bg-success/20 text-success rounded-full px-3 py-1 text-xs flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +3%
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Based on 2,348 ratings</p>
                    <div className="flex mt-5 space-x-1">
                        {[92, 85, 76, 45, 23].map((value, index) => (
                            <div key={index} className="h-12 flex-1 bg-dark-light/10 rounded-md relative overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-info transition-all duration-300" style={{ height: `${value}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                        <span>5★</span>
                        <span>4★</span>
                        <span>3★</span>
                        <span>2★</span>
                        <span>1★</span>
                    </div>
                </div>
            </div>

            {/* User Growth and Support Tickets Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full xl:col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">User Acquisition</h5>
                        <div className="dropdown">
                            <Dropdown offset={[0, 5]} btnClassName="hover:text-primary" button={<MoreHorizontal className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary" />}>
                                <ul>
                                    <li>
                                        <button type="button">View Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Edit Report</button>
                                    </li>
                                    <li>
                                        <button type="button">Mark as Done</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-5">Monthly breakdown of new user acquisition by channel</p>
                    <ReactApexChart series={userAcquisition.series} options={userAcquisition.options} type="area" height={350} />
                </div>

                <div className="panel h-full">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Support Ticket Status</h5>
                        <div className="dropdown">
                            <Dropdown offset={[0, 5]} btnClassName="hover:text-primary" button={<MoreHorizontal className="w-5 h-5 text-black/70 dark:text-white/70 hover:!text-primary" />}>
                                <ul>
                                    <li>
                                        <button type="button">View All</button>
                                    </li>
                                    <li>
                                        <button type="button">Export as PDF</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <ReactApexChart options={ticketStatus.options} series={ticketStatus.series} type="donut" height={320} />
                </div>
            </div>

            {/* Recent Support Tickets */}
            <div className="panel h-full">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Recent Support Tickets</h5>
                    <div className="flex items-center">
                        <button type="button" className="btn btn-outline-primary btn-sm mr-2">
                            <FileText className="w-4 h-4 mr-2" />
                            Export
                        </button>
                        <button type="button" className="btn btn-primary btn-sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Ticket
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recentTickets.map((ticket, index) => (
                                <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-900/20 transition-colors duration-150">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium">{ticket.id}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm">{ticket.subject}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={ticket.img} alt={ticket.user} className="w-8 h-8 rounded-full mr-2" />
                                            <span className="text-sm">{ticket.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`text-xs px-2.5 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">{ticket.date}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <button type="button" className="text-info hover:text-blue-700" title="View">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button type="button" className="text-primary hover:text-primary-dark" title="Reply">
                                                <MessageSquare className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between mt-5">
                    <span className="text-sm">Showing 5 of 24 tickets</span>
                    <div className="flex space-x-2">
                        <button className="btn btn-sm btn-outline-primary">Previous</button>
                        <button className="btn btn-sm btn-outline-primary active">1</button>
                        <button className="btn btn-sm btn-outline-primary">2</button>
                        <button className="btn btn-sm btn-outline-primary">3</button>
                        <button className="btn btn-sm btn-outline-primary">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
