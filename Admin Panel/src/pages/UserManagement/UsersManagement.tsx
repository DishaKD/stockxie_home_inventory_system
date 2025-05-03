import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import sortBy from 'lodash/sortBy';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { ActionIcon, Group, Text, Modal, TextInput, Button, Stack, Checkbox } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('User Management'));
    }, [dispatch]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [hideCols, setHideCols] = useState<any>(['dob']);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [editForm, setEditForm] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const cols = [
        { accessor: 'id', title: 'ID' },
        { accessor: 'userName', title: 'User Name' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'actions', title: 'Actions' },
    ];

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/auth/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const users = response.data.users;

            const mappedUsers = users.map((user: any) => ({
                id: user.id,
                userName: user.userName || user.username,
                email: user.email,
            }));

            setInitialRecords(mappedUsers);
        } catch (error) {
            console.error('Failed to fetch users', error);
            Swal.fire('Error!', 'Failed to fetch users', 'error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((prev: any) => prev.filter((d: any) => d !== col));
        } else {
            setHideCols((prev: any) => [...prev, col]);
        }
    };

    const handleEditClick = (user: any) => {
        setCurrentUser(user);
        setEditForm({
            userName: user.userName,
            email: user.email,
            password: '',
            confirmPassword: '',
        });
        setEditModalOpen(true);
    };

    // Update the error handling in handleUpdateUser and handleDelete
    const handleUpdateUser = async () => {
        if (editForm.password !== editForm.confirmPassword) {
            Swal.fire('Error!', 'Passwords do not match', 'error');
            return;
        }

        try {
            const payload: any = {
                userName: editForm.userName,
                email: editForm.email,
            };

            if (editForm.password) {
                payload.password = editForm.password;
            }

            await axios.put(`http://localhost:8000/api/auth/users/update/${currentUser.id}`, payload, {});

            Swal.fire('Success!', 'User updated successfully', 'success');
            setEditModalOpen(false);
            fetchUsers();
        } catch (error) {
            console.error('Failed to update user', error);
            let errorMessage = 'Failed to update user';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }
            Swal.fire('Error!', errorMessage, 'error');
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/auth/users/delete/${id}`, {});

                Swal.fire('Deleted!', 'User has been deleted.', 'success');
                fetchUsers();
            } catch (error) {
                console.error('Failed to delete user', error);
                let errorMessage = 'Failed to delete user';
                if (axios.isAxiosError(error)) {
                    errorMessage = error.response?.data?.message || errorMessage;
                }
                Swal.fire('Error!', errorMessage, 'error');
            }
        }
    };

    return (
        <div>
            <div className="panel mt-6">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">User Management</h5>
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="flex md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                                            <IconCaretDown className="w-5 h-5" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[140px]">
                                        {cols.map((col, i) => (
                                            <li
                                                key={i}
                                                className="flex flex-col"
                                                onClick={(e) => e.stopPropagation()}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.stopPropagation();
                                                    }
                                                }}
                                                tabIndex={0}
                                            >
                                                <div className="flex items-center px-4 py-1">
                                                    <label className="cursor-pointer mb-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={!hideCols.includes(col.accessor)}
                                                            className="form-checkbox"
                                                            defaultValue={col.accessor}
                                                            onChange={(event: any) => {
                                                                showHideColumns(col.accessor, event.target.checked);
                                                            }}
                                                        />
                                                        <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true, hidden: hideCols.includes('id') },
                            { accessor: 'userName', title: 'User Name', sortable: true, hidden: hideCols.includes('userName') },
                            { accessor: 'email', title: 'Email', sortable: true, hidden: hideCols.includes('email') },

                            {
                                accessor: 'actions',
                                title: 'Actions',
                                hidden: hideCols.includes('actions'),
                                render: (user) => (
                                    <Group spacing={4} position="right" noWrap>
                                        <ActionIcon
                                            color="blue"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(user);
                                            }}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            color="red"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(user.id);
                                            }}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Group>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>

            {/* Edit User Modal */}

            <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit User" size="md">
                <Stack>
                    <TextInput label="First Name" value={editForm.userName} onChange={(e) => setEditForm({ ...editForm, userName: e.target.value })} />
                    <TextInput label="Email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                    <TextInput label="Password" type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} />
                    <TextInput label="Confirm Password" type="password" value={editForm.confirmPassword} onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })} />

                    <Group position="right" mt="md">
                        <Button variant="default" onClick={() => setEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="default" color="blue" onClick={handleUpdateUser}>
                            Save Changes
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </div>
    );
};

export default UserManagement;
