import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import './history.css';

export function History(props) {
    const [history, setHistory] = useState([]);


    useEffect(() => {
        let historyList = props.history || [];
        var mappedHistory = historyList.map((x, i) => { return { id: i + 1, history: x } });
        setHistory(mappedHistory);
    });

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return (
        <div>
            <div className="card">
                <DataTable value={history} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    <Column field="id" header="History ID"></Column>
                    <Column field="history" header="History"></Column>
                </DataTable>
            </div>

        </div>
    );
}