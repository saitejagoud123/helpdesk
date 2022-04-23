import StatusService from "./statusService";
import UserService from "./userService";

export default class TicketService {
    #userService;
    #statusService;
    #currentUser;
    constructor() {
        if (TicketService._instance) {
            return TicketService._instance
        }
        TicketService._instance = this;
        this.#statusService = new StatusService();
        this.#userService = new UserService();
        this.#currentUser = this.#userService.getCurrentUser();
    }

    #tickets = [
        {
            "ticketId": 1,
            "subject": "Aut corrupti praese",
            "description": "Rerum minus magnam s",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": ["Rerum minus magnam s 1", "Rerum minus magnam s 2", "Rerum minus magnam s 3", "Rerum minus magnam s 4", "Rerum minus magnam s 5", "Rerum minus magnam s 6", "Rerum minus magnam s 7", "Rerum minus magnam s 8"],
            "history": ['Aut corrupti praese 1','Aut corrupti praese 2'],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 2,
            "subject": "Harum placeat paria",
            "description": "Amet eiusmod ad qui",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 3,
            "subject": "Laborum Quo pariatu",
            "description": "Et asperiores conseq",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 4,
            "subject": "Quia similique qui e",
            "description": "Omnis itaque nobis r",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 5,
            "subject": "Sint consequatur Of",
            "description": "Ullam quod consequun",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 6,
            "subject": "Aut qui eos rerum e",
            "description": "Quia quisquam tempor",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 7,
            "subject": "Amet error exercita",
            "description": "Harum voluptatem sed",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 8,
            "subject": "Et quos quis aperiam",
            "description": "Earum repellendus Q",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 9,
            "subject": "Enim repudiandae ass",
            "description": "Sit molestiae quia ",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 10,
            "subject": "Cillum eligendi moll",
            "description": "Eaque veritatis sunt",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        },
        {
            "ticketId": 11,
            "subject": "Aspernatur velit imp",
            "description": "Aut expedita ab pari",
            "attachments": [],
            "status": "1",
            "comment": "",
            "comments": [],
            "history": [],
            "createdDateTime": "Fri, 15 Apr 2022 14:26:26 GMT",
            "modifiedDateTime": "Fri, 15 Apr 2022 14:26:26 GMT"
        }
    ];


    getTickets() {
        let tickets = [...this.#tickets];
        tickets.forEach(x => { x.createdByName = this.#userService.getUser(x.createdBy).name });
        return new Promise(resolve => setTimeout(resolve(tickets), 1000));
    }

    saveTicket(data) {
        data.ticketId = this.#tickets.length + 1;
        data.createdDateTime = new Date().toUTCString();
        data.modifiedDataTime = new Date().toUTCString();
        data.createdBy = this.#currentUser.userId;
        if (data.comment) {
            data.comments.push(data.comment);
        }
        delete data.comment;
        this.#tickets.push({ ...data });
        this.updateHistory(data.ticketId, `Ticket created with Id: ${data.ticketId}`)
        return new Promise(resolve => setTimeout(resolve(data), 1000));
    }
    updateTicket(data) {
        let ticketIndex = this.#tickets.findIndex(x => x.ticketId == data.ticketId);
        if (ticketIndex != -1) {
            let ticket = this.#tickets[ticketIndex];

            ticket.modifiedDataTime = new Date().toUTCString();
            if (data.comment) {
                ticket.comments.push(data.comment);
            }
            ticket.status = data.status;
            this.updateHistory(data.ticketId, `Ticket with Id: ${data.ticketId} is updated`)
        }
        return new Promise(resolve => setTimeout(resolve(), 1000));
    }
    deleteTicket(ticketId) {
        let ticketIndex = this.#tickets.findIndex(x => x.ticketId == ticketId);
        if (ticketIndex != -1) {
            this.#tickets.splice(ticketIndex, 1);
        }
        return new Promise(resolve => setTimeout(resolve({}), 1000));
    }
    getTicket(ticketId) {
        let ticket = this.#tickets.find(x => x.ticketId == ticketId);
        if (ticket) {
            ticket.status = this.#statusService.getstatus(ticket.status);
            ticket.createdBy = this.#userService.getUser(ticket.createdBy);
        }
        return new Promise(resolve => setTimeout(resolve(ticket), 1000));
    }

    updateHistory(ticketId, history) {
        let ticketIndex = this.#tickets.findIndex(x => x.ticketId == ticketId);
        if (ticketIndex != -1) {
            this.#tickets[ticketIndex].history.push(history);
        }
        return new Promise(resolve => setTimeout(resolve(this.#tickets[ticketIndex]), 1000));
    }
}