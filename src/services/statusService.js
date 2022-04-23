import Status from "../models/Status";
export default class StatusService {
    #statuses=[];
    constructor() {
        if (StatusService._instance) {
            return StatusService._instance
        }
        this.#statuses = (new Status()).getStatuses();
        StatusService._instance = this;
    }

    // #roles = [
    //     {
    //         roleId: 1,
    //         roleName: 'Admin'
    //     },
    //     {
    //         roleId: 2,
    //         roleName: 'User'
    //     }
    // ];
    // #users = [
    //     {
    //         userId: 1,
    //         name: 'Sai Teja',
    //         roles: [1, 2]
    //     },
    //     {
    //         userId: 2,
    //         name: 'Sri Hari',
    //         roles: [2]
    //     },
    //     {
    //         userId: 3,
    //         name: 'Rocky',
    //         roles: [1]
    //     }
    // ]

    // #tickets = [
    //     {
    //         "ticketId": 1,
    //         "subject": "Aut corrupti praese",
    //         "description": "Rerum minus magnam s",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 2,
    //         "subject": "Harum placeat paria",
    //         "description": "Amet eiusmod ad qui",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 3,
    //         "subject": "Laborum Quo pariatu",
    //         "description": "Et asperiores conseq",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 4,
    //         "subject": "Quia similique qui e",
    //         "description": "Omnis itaque nobis r",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 5,
    //         "subject": "Sint consequatur Of",
    //         "description": "Ullam quod consequun",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 6,
    //         "subject": "Aut qui eos rerum e",
    //         "description": "Quia quisquam tempor",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 7,
    //         "subject": "Amet error exercita",
    //         "description": "Harum voluptatem sed",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 8,
    //         "subject": "Et quos quis aperiam",
    //         "description": "Earum repellendus Q",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 9,
    //         "subject": "Enim repudiandae ass",
    //         "description": "Sit molestiae quia ",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 10,
    //         "subject": "Cillum eligendi moll",
    //         "description": "Eaque veritatis sunt",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     },
    //     {
    //         "ticketId": 11,
    //         "subject": "Aspernatur velit imp",
    //         "description": "Aut expedita ab pari",
    //         "attachments": [],
    //         "status": "1",
    //         "comment": "",
    //         "comments": [],
    //         "history": [],
    //         "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
    //         "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
    //     }
    // ];

    // #statuses = [
    //     { id: 1, statusName: 'Created' },
    //     { id: 2, statusName: 'Assigned' },
    //     { id: 3, statusName: 'Inprogress' },
    //     { id: 4, statusName: 'Resolved' }
    // ];

    // setCurrentUser(userId) {
    //     this.#currentUser = this.#users.find(x => x.userId == userId);
    //     return new Promise(resolve => setTimeout(resolve(this.#currentUser), 1000));
    // }
    // getUser(userId) {
    //     let user = this.#users.find(x => x.userId == userId);
    //     return new Promise(resolve => setTimeout(resolve(user || {}), 100));
    // }
    // getUserName(userId) {
    //     let user = this.#users.find(x => x.userId == userId);
    //     return user?.name || 'N/A';
    // }
    // getUserData(userId) {
    //     if (userId) {
    //         let user = this.#users.find(x => x.userId == userId);
    //         return user;
    //     }
    //     return '';
    // }
    // getCurrentUser() {
    //     return new Promise(resolve => setTimeout(resolve(this.#currentUser), 1000));
    // }

    // getTickets() {
    //     let tickets = [...this.#tickets];
    //     tickets.forEach(x => { x.createdByName = this.getUserName(x.createdBy) });
    //     return new Promise(resolve => setTimeout(resolve(tickets), 1000));
    // }
    // getUsers() {
    //     return new Promise(resolve => setTimeout(resolve([...this.#users]), 1000));
    // }
    // saveTicket(data) {
    //     data.ticketId = this.#tickets.length + 1;
    //     data.createdDateTime = new Date().toUTCString();
    //     data.modifiedDataTime = new Date().toUTCString();
    //     data.createdBy = this.#currentUser.userId;
    //     if (data.comment) {
    //         data.comments.push(data.comment);
    //     }
    //     this.#tickets.push({ ...data });
    //     this.updateHistory(data.ticketId,`Ticket created with Id:${data.ticketId}`)
    //     return new Promise(resolve => setTimeout(resolve(data), 1000));
    // }
    // updateTicket(data) {
    //     let ticketIndex = this.#tickets.findIndex(x => x.ticketId == data.ticketId);
    //     if (data.comment) {
    //         data.comments.push(data.comment);
    //     }
    //     if (ticketIndex != -1) {
    //         data.modifiedDataTime = new Date().toUTCString();
    //         this.#tickets[ticketIndex] = data;
    //     }
    //     return new Promise(resolve => setTimeout(resolve({}), 1000));
    // }
    // deleteTicket(ticketId) {
    //     let ticketIndex = this.#tickets.findIndex(x => x.ticketId == ticketId);
    //     if (ticketIndex != -1) {
    //         this.#tickets.splice(ticketIndex, 1);
    //     }
    //     return new Promise(resolve => setTimeout(resolve({}), 1000));
    // }
    getstatuses() {
        return new Promise(resolve => setTimeout(resolve(this.#statuses), 1000));
    }
    getstatus(id) {
        return this.#statuses.find(x => x.id == id);
    }

    // getTicket(ticketId) {
    //     let ticket = this.#tickets.find(x => x.ticketId == ticketId);
    //     if (ticket) {
    //         ticket.status = this.getstatus(ticket.status);
    //         ticket.createdBy = this.getUserData(ticket.createdBy);
    //     }
    //     console.log(ticket)
    //     return new Promise(resolve => setTimeout(resolve(ticket), 1000));
    // }

    // updateHistory(ticketId, history) {
    //     let ticketIndex = this.#tickets.findIndex(x => x.ticketId == ticketId);
    //     if (ticketIndex != -1) {
    //         this.#tickets[ticketIndex].history.push(history);
    //     }
    //     return new Promise(resolve => setTimeout(resolve(this.#tickets[ticketIndex]), 1000));
    // }
}