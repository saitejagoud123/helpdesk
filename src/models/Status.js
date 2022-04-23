export default class Status {
    static Created = 'created';
    static Assigned = 'assigned';
    static Inprogress = 'inprogress';
    static Resolved = 'resolved';

    #statuses = [
        { id: 1, statusName: Status.Created },
        { id: 2, statusName: Status.Assigned },
        { id: 3, statusName: Status.Inprogress },
        { id: 4, statusName: Status.Resolved }
    ];

    getStatuses() {
        return [...this.#statuses];
    }
}