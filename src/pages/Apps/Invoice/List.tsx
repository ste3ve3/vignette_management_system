import { Link, NavLink } from 'react-router-dom';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import IconEdit from '../../../components/Icon/IconEdit';
import IconEye from '../../../components/Icon/IconEye';
import ModalDialog from '../../../components/global/ModalDialog';

const List = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice List'));
    });
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 1,
            invoice: '081451',
            name: 'Steve Ndicunguye',
            phone: '0788619790',
            type: 'Individual',
            email: 'ndicunguyesteve4@gmail.com',
            status: { tooltip: 'Active', color: 'success' },
            profile: 'profile-1.jpeg',
        },
    ]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSearch('');
                setSelectedRecords([]);
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSearch('');
                setSelectedRecords([]);
                setPage(1);
            }
        }
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [modalVisibility, setModalVisibility] = useState(false)

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.type.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center justify-between w-full md:flex-row flex-col gap-5">
                    <div className="w-full ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-full" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 w-48">
                        <button onClick={() => setModalVisibility(true)} className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </button>
                    </div>
                    
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className="whitespace-nowrap table-hover invoice-table"
                        records={records}
                        columns={[
                            {
                                accessor: 'name',
                                render: ({ name, id }) => (
                                    <div className="flex items-center font-semibold">
                                        <div className="p-0.5 bg-white-dark/30 rounded-full w-max ltr:mr-2 rtl:ml-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/steve.png`} alt="" />
                                        </div>
                                        <div>{name}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: 'phone',
                            },
                            {
                                accessor: 'email',
                            },
                            {
                                accessor: 'type',
                            },
                            {
                                accessor: 'status',
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <button className="flex hover:text-info">
                                            <IconEdit className="w-4.5 h-4.5 text-info" />
                                        </button>
                                        <button className="flex hover:text-primary">
                                            <IconEye className='text-success'/>
                                        </button>
                                        <button type="button" className="flex hover:text-danger">
                                            <IconTrashLines className='text-danger'/>
                                        </button>
                                    </div>
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
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
            <ModalDialog
                modalVisibility={modalVisibility}
                setModalVisibility={setModalVisibility}
                title="Add New Customer"
                body={
                    <>
                        <div className="mb-5">
                            <label htmlFor="title">Names</label>
                            <input id="title" type="text" placeholder="Enter Names" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="title">Phone Number</label>
                            <input id="title" type="text" placeholder="Enter Phone number" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="title">Email</label>
                            <input id="title" type="text" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="assignee">Customer Type</label>
                            <select id="assignee" className="form-select">
                                <option value="">Individual</option>
                                <option value="John Smith">Company</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="assignee">Status</label>
                            <select id="assignee" className="form-select">
                                <option value="">Active</option>
                                <option value="John Smith">Inactive</option>
                            </select>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default List;
