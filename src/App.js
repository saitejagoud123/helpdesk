import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { Menubar } from 'primereact/menubar';
import { Fragment, useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { NewTicket } from './common/newticket';
import { TicketList } from './common/TicketList/ticketList';
import StatusService from '../src/services/statusService';
import UserService from '../src/services/userService';
import TicketService from '../src/services/ticketService';

function App() {

  const [visible, setVisible] = useState(false);
  const [ticketId, setTicketId] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [usersMenu, setUsersMenu] = useState([]);
  const [refreshData, setRefreshData] = useState(true);
  const openNewTicketDialog = (event) => setVisible(true);
  const closeNewTicketDialog = (event) => setVisible(false);
  const userService = new UserService();
  const ticketService = new TicketService();
  const menu = useRef(null);
  const items = [
    {
      label: 'New Ticket',
      icon: 'pi pi-fw pi-plus',
      command: (event) => {
        openNewTicketDialog(event);
      }
    },
  ];

  const onTicketCreatedHandled = () => {
    setRefreshData(!refreshData);
    closeNewTicketDialog();
  }
  const onEditHandled = (ticketId) => {
    setTicketId(ticketId);
    setIsEdit(true);
    openNewTicketDialog();
  }
  const onDeleteHandled = (ticketId) => {
    ticketService.deleteTicket(ticketId).then(x => {
      setRefreshData(!refreshData);
    });
  }
  const onTicketUpdateHandled = () => {
    setRefreshData(!refreshData);
    onHide();
  }
  const onHide = () => {
    closeNewTicketDialog();
    setTicketId(undefined);
    setIsEdit(false);
  }

  const updateCurrentUser = (userId) => {
    setCurrentUser(userService.setCurrentUser(userId));
  }

  function prepareUsersMenu(users) {

    let appUsers = users.map(element => {
      return {
        label: <span>
          {element.name} &nbsp;
          {userService.isAdmin(element.userId) && <Tag value="A" rounded='true' />}&nbsp;
          {userService.isUser(element.userId) && <Tag value="U" rounded='true' />}
        </span>,
        icon: 'pi pi-user',
        command: (event) => {
          updateCurrentUser(element.userId);
        }
      }
    });
    setUsersMenu(appUsers);
  }

  useEffect(() => {
    prepareUsersMenu(userService.getUsers());
    setCurrentUser(userService.getCurrentUser());
  }, []);

  return (
    <Fragment >
      <Menubar model={items}
        start={<img alt="logo" src="logo.png" height="40" class="mr-2" />}
        end={<span><Button label={currentUser?.name} disabled className='mr-10 p-button-text' /><Button label="Switch User" className='mr-10' icon="pi pi-users" onClick={(event) => menu.current.toggle(event)} /></span>} />
      <Dialog header="New ticket" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
        <NewTicket isEdit={isEdit} onTicketCreated={onTicketCreatedHandled} onTicketUpdated={onTicketUpdateHandled} ticketId={ticketId}></NewTicket>
      </Dialog>
      <TicketList refreshData={refreshData} onEditClicked={onEditHandled} onDeleteClicked={onDeleteHandled} ></TicketList>
      <Menu model={usersMenu} popup ref={menu} />
    </Fragment>
  );
}

export default App;
