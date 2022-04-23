import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import './comments.css';

export function Comments(props) {
    const [comments, setComments] = useState([]);


    useEffect(() => {
        let commentList = props.comments || [];
        var mappedComments = commentList.map((x, i) => { return { id: i + 1, comment: x } });
        setComments(mappedComments);
    });

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    return (
        <div>
            <div className="card">
                <DataTable value={comments} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    <Column field="id" header="Comment ID"></Column>
                    <Column field="comment" header="Comment"></Column>
                </DataTable>
            </div>

        </div>
    );
}