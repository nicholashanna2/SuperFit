export class SessionList {
    constructor() {
        this.SessionArray = [];
    }

    // Add a session to the session list
    addSession(session) {
        this.SessionArray.push(session);
    }

    // Display all sessions
    printSessions() {
        if (this.SessionArray.length === 0) {
            alert("No sessions saved yet.");
            return;
        }

        for (const session of this.SessionArray) {
            alert(`Session Date: ${session.sessionDate}`);
        }
    }
}