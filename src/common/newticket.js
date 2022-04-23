
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import StatusService from '../services/statusService';
import TicketService from '../services/ticketService';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import './newticket.css';
import UserService from '../services/userService';

export function NewTicket(props) {
    const defaultValues = {
        ticketId: 0,
        subject: '',
        description: '',
        attachments: [],
        status: '',
        comment: '',
        comments: [],
        history: [],
        createdFor: { userId: 1, name: 'Sai Teja', roles: Array(2) }
    };
    const [statues, setStatues] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEdit] = useState(props.isEdit || false);
    const { handleSubmit, formState: { errors, isValid }, control, setValue, reset } = useForm({ defaultValues, mode: 'onChange' });
    const statusService = new StatusService();
    const ticketService = new TicketService();
    const userService = new UserService();

    const onSubmit = data => {
        data.attachments = data.attachments || [];
        reset();

        if (!isEdit) {
            data.status = data.status?.id || '1';
            data.createdFor = data.createdFor?.userId || '';
            ticketService.saveTicket(data).then(x => {
                props.onTicketCreated(x);
            });
        } else {
            data.status = data.status || '1';
            data.createdFor = data.createdFor || '';
            ticketService.updateTicket(data).then(x => {
                props.onTicketUpdated(x);
            });
        }
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const onAttachmentSelected = ({ files }) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log(e.target.result)
            setValue('attachments', { name: file.name, value: e.target.result, size: file.size, type: file.type });
        };
        fileReader.readAsDataURL(file);
    };

    useEffect(() => {
        statusService.getstatuses().then(x => {
            setStatues(x);
        });
        if (props.isEdit) {
            ticketService.getTicket(props.ticketId).then(x => {
                reset(x);
            });
        }
        setUsers(userService.getUsers());
        let activeUser = userService.getCurrentUser();
        setCurrentUser(activeUser);
        setIsAdmin(userService.isAdmin(activeUser.userId));
    }, []);

    return (
        <div className="form-demo">
            <div className='flex justify-content-center'>
                <div className='card'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {isEdit && <div className={classNames({ 'field': true })}>
                            <span className="p-float-label">
                                <Controller name="ticketId" control={control} rules={{ required: 'Ticket Id is required.', min: 0 }} render={({ field, fieldState }) => (
                                    <InputText type='number' id={field.name}  {...field} autoFocus disabled={isEdit} className={classNames({ 'p-invalid': fieldState.invalid, 'p-inputtext-sm': true })} />
                                )} />
                                <label htmlFor="ticketId" className={classNames({ 'p-error': errors.ticketId })}>Ticket Id*</label>
                            </span>
                            {getFormErrorMessage('ticketId')}
                        </div>
                        }
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="subject" control={control} rules={{ required: 'Subject is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} disabled={isEdit} autoFocus className={classNames({ 'p-invalid': fieldState.invalid, 'p-inputtext-sm': true })} />
                                )} />
                                <label htmlFor="subject" className={classNames({ 'p-error': errors.subject })}>Subject*</label>
                            </span>
                            {getFormErrorMessage('subject')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="description" control={control} rules={{ required: 'Description is required.' }} render={({ field, fieldState }) => (
                                    <InputTextarea rows={5} cols={80} disabled={isEdit} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid, 'p-inputtext-sm': true })} />
                                )} />
                                <label htmlFor="description" className={classNames({ 'p-error': errors.description })}>Description*</label>
                            </span>
                            {getFormErrorMessage('description')}
                        </div>
                        {isAdmin && <div className={classNames({ 'field': true })}>
                            <span className="p-float-label">
                                <Controller name="createdFor" control={control} render={({ field }) => (
                                    <Dropdown id={field.userId} disabled={isEdit} className='p-inputtext-sm' value={field.value} onChange={(e) => field.onChange(e.value)} options={users} optionLabel="name" />
                                )} />
                                <label htmlFor="createdFor">Created For</label>
                            </span>
                        </div>}
                        {isEdit && <div className={classNames({ 'field': true })}>
                            <span className="p-float-label">
                                <Controller name="status" control={control} render={({ field }) => (
                                    <Dropdown id={field.id} className='p-inputtext-sm' value={field.value} onChange={(e) => field.onChange(e.value)} options={statues} optionLabel="statusName" />
                                )} />
                                <label htmlFor="status">Status</label>
                            </span>
                        </div>}
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="attachments" control={control} render={({ field, fieldState }) => (
                                    <FileUpload name={field.name} id={field.name} customUpload={false} chooseLabel="Upload file" {...field} mode='basic' onSelect={onAttachmentSelected} accept="image/*" maxFileSize="1000000" className={classNames({ 'p-invalid': fieldState.invalid, 'p-button-sm': true })} />
                                )} />
                            </span>
                            {getFormErrorMessage('attachments')}
                        </div>
                        {(isEdit || isAdmin) && <div className={classNames({ 'field': true })}>
                            <span className="p-float-label">
                                <Controller name="comment" control={control} render={({ field, fieldState }) => (
                                    <InputTextarea rows={5} cols={80} id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid, 'p-inputtext-sm': true })} />
                                )} />
                                <label htmlFor="comment" className={classNames({ 'p-error': errors.comment })}>Comment</label>
                            </span>
                            {getFormErrorMessage('comment')}
                        </div>}
                        <Button type="submit" disabled={!isValid} className='p-button-sm mt-2' label="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}