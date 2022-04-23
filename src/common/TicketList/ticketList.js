import { Fragment, useEffect, useState } from 'react';
import StatusService from '../../services/statusService';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import './ticketList.css';
import UserService from '../../services/userService';
import TicketService from '../../services/ticketService';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Comments } from '../../components/comments/comments';
import { History } from '../../components/history/history';

export function TicketList(props) {
    const [tickets, setTickets] = useState([]);
    const [statues, setStatues] = useState([]);
    const [comments, setComments] = useState([]);
    const [history, setHistory] = useState([]);
    const [visibleComments, setVisibleComments] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const statusService = new StatusService();
    const userService = new UserService();
    const ticketService = new TicketService();
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    useEffect(() => {
        ticketService.getTickets().then(x => {
            setTickets(x);
        });
    }, [props.refreshData]);

    useEffect(() => {
        statusService.getstatuses().then(x => {
            setStatues(x);
        });
    }, []);

    const getStatus = ({ status }) => {
        let statusSelected = statues.filter(x => x.id == status);
        if (statusSelected && statusSelected.length > 0) {
            return statusSelected[0].statusName;
        }
        return 'N/A';
    }
    const openDialog = (event) => {
        event.preventDefault();
        setVisibleComments(true);
    }
    const openHistory = (event) => {
        event.preventDefault();
        setVisibleHistory(true);
    }
    const getCommentsCount = ({ comments }) => {
        if (comments && comments.length > 0) {
            setComments(comments);
            return <a href='/' onClick={openDialog}>{comments.length}</a>;
        }
        return 0;
    }
    const getHistoryCount = ({ history }) => {
        if (history && history.length > 0) {
            setHistory(history);
            return <a href='/' onClick={openHistory}>{history.length}</a>;
        }
        return 0;
    }

    function editProduct({ ticketId }) {
        props.onEditClicked(ticketId);
    }

    function confirmDeleteProduct({ ticketId }) {
        props.onDeleteClicked(ticketId);
    }

    function toBase64(arr) {
        //arr = new Uint8Array(arr) if it's an ArrayBuffer
        if (arr) {
            return btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }
        return null;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <Fragment>
                <i className="pi pi-pencil m10" onClick={() => editProduct(rowData)}></i>
                <i className="pi pi-trash m10" onClick={() => confirmDeleteProduct(rowData)}></i>
            </Fragment>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return (
            <Fragment>
                {/* <img src={"data:image/png;base64," + `${toBase64(rowData.attachments?.value)}`}></img> */}
                {/* <img src={rowData.attachments?.value} style={{ 'width': '100px' }}></img> */}
                <Image src={rowData.attachments?.value || 'noimage.jpg'}  width="100" preview />
            </Fragment >
        );
    }

    return (
        <div>
            <div className="card">
                <DataTable value={tickets} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    <Column field="ticketId" header="Ticket ID"></Column>
                    <Column field="subject" header="Subject"></Column>
                    <Column field="description" header="Description"></Column>
                    <Column field={getStatus} header="Status"></Column>
                    <Column field={imageBodyTemplate} header="Image"></Column>
                    <Column field="createdByName" header="CreatedBy"></Column>
                    <Column field='createdDateTime' header="Created At"></Column>
                    <Column field={getCommentsCount} header="Comments"></Column>
                    <Column field={getHistoryCount} header="History"></Column>
                    <Column header="Actions" body={actionBodyTemplate}>
                    </Column>
                </DataTable>
            </div>
            <Dialog header="Comments"  visible={visibleComments} style={{ width: '60vw' }} onHide={() => setVisibleComments(false)}>
                <Comments comments={comments}></Comments>
            </Dialog>
            <Dialog header="History"  visible={visibleHistory} style={{ width: '60vw' }} onHide={() => setVisibleHistory(false)}>
                <History history={history}></History>
            </Dialog>
        </div>
    );
}